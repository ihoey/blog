const server = 'https://hitalk-next-api.ihoey.com/api';
type SDK = { mount: (element: HTMLElement, options: Record<string, unknown>) => unknown; fillCommentCounts: (options: { server: string }) => Promise<void> };
declare global { interface Window { Hitalk?: SDK } }

let sdkLoading: Promise<void> | undefined;
async function loadSDK() {
  if (window.Hitalk) return;
  sdkLoading ??= new Promise<void>((resolve, reject) => {
    const script = document.createElement('script');
    script.src = '/lib/hitalk/3.0.0/hitalk.68b2aa7c6d13.js';
    script.onload = () => resolve(); script.onerror = () => reject(new Error('SDK unavailable'));
    document.head.append(script);
  });
  await sdkLoading;
}

export async function loadCommentCounts() {
  if (location.hostname !== 'blog.ihoey.com') return;
  try {
    await loadSDK();
    await window.Hitalk?.fillCommentCounts({ server });
  } catch { /* Keep the discussion link usable if the read-only count fails. */ }
}

export async function mountComments() {
  const container = document.querySelector<HTMLElement>('#comments[data-comment-path]');
  if (!container) return;
  // Preview never mounts the write-capable production SDK. There is no query-string bypass.
  if (location.hostname !== 'blog.ihoey.com') {
    container.replaceChildren(Object.assign(document.createElement('p'), {
      className: 'comment-status', textContent: '本地预览暂不开放评论，历史评论和留言将在正式站点继续保留。',
    }));
    return;
  }
  try {
    await loadSDK();
    if (!window.Hitalk) throw new Error('SDK unavailable');
    container.replaceChildren();
    window.Hitalk.mount(container, {
      server, path: container.dataset.commentPath, title: container.dataset.commentTitle,
      placeholder: 'ヾﾉ≧∀≦)o来啊，快活啊!', avatar: 'monsterid', pageSize: 10,
    });
  } catch {
    const status = document.createElement('p');
    status.className = 'comment-status'; status.setAttribute('role', 'status');
    status.textContent = '评论暂时无法加载，请稍后刷新重试。'; container.replaceChildren(status);
  }
}
