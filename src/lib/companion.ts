// The legacy themes/next/source/message.json is the source for these contextual replies.
// Delegate events so late-mounted comment controls work without polling or rebinding.
const companion = document.querySelector<HTMLElement>('[data-global-companion]');
const bubble = companion?.querySelector<HTMLElement>('.companion-message');
const enabled = () => document.documentElement.dataset.effects !== 'off';
let timer: ReturnType<typeof setTimeout>;
let petReply = 0;
function say(text: string, duration = 4500) {
  if (!bubble || !enabled()) return;
  clearTimeout(timer);
  bubble.hidden = false;
  bubble.textContent = text;
  timer = setTimeout(() => { bubble.hidden = true; }, duration);
}
const label = (el: Element) => (el.textContent?.trim() || el.getAttribute('aria-label') || '').replace(/\s+/g, ' ').slice(0, 60);
type Tip = { selector: string; text: string | ((el: Element) => string) };
const tips: Tip[] = [
  { selector: '.pet-button', text: '鼠…鼠标放错地方了！快来和我打个招呼吧～' },
  { selector: '.main-nav a, .post-summary h2 a', text: el => `要看看「${label(el)}」么？` },
  { selector: '.site-name, .footer-name', text: '要返回主页嘛？' },
  { selector: '.avatar-link', text: '那不要乱玩噢～这是主人的头像。' },
  { selector: '.prose img', text: '文章特色配图好看嘛？' },
  { selector: '.read-link', text: '想要了解更多，那就再深入点吧～' },
  { selector: '.friend-list a', text: '这是主人的好伙伴噢～' },
  { selector: '.author-social a, .footer-bottom a[href*="github.com"]', text: '主人的社交 ID，不关注下嘛？' },
  { selector: '.author-stats a, .taxonomy-list a, .sidebar-topics a, .topic-links a', text: el => `去「${label(el)}」里逛逛吧～` },
  { selector: '.adjacent-posts a, .pagination a', text: el => `接着看看「${label(el)}」吧～` },
  { selector: '.article-toc a', text: el => `这一节是「${label(el)}」，带你过去看看。` },
  { selector: '.back-top', text: '回到顶部去吧～' },
  { selector: '.discussion-link', text: '想要吐槽些什么吗？来聊一聊吧。' },
  { selector: '.copy-code', text: '点一下就能复制代码啦。' },
  { selector: '[data-hitalk-secret] button', text: '嘘，叫小猫出来陪你玩吧。' },
  { selector: '.theme-toggle', text: '换个光线，继续慢慢看。' },
  { selector: '.effects-toggle', text: '想安静阅读的话，可以在这里关掉个性效果。' },
  { selector: '#comments input[name="nick"]', text: '敢问客官尊姓大名～' },
  { selector: '#comments input[name="email"], #comments input[name="mail"]', text: '邮箱可以选填；想收到回复提醒，记得勾选邮件通知。' },
  { selector: '#comments input[name="website"], #comments input[name="link"]', text: '客官的博客在哪儿呢？我要去看看。' },
  { selector: '#comments textarea, #comments [contenteditable="true"]', text: '想说些什么呢？我在听噢～' },
  { selector: '#comments [aria-label="插入表情"], #comments .smilies-logo', text: '客官要挑选一个滑稽的表情吗？' },
  { selector: '#comments .vsubmit', text: '写好后检查一下，就可以发送啦。' },
];
function showContext(event: Event) {
  if (!enabled()) return;
  for (const node of event.composedPath()) {
    if (!(node instanceof Element)) continue;
    for (const tip of tips) {
      const matched = node.closest(tip.selector);
      if (!matched) continue;
      // Moving between descendants of one link must not repeatedly announce the same reply.
      if (event instanceof MouseEvent && event.relatedTarget instanceof Node && matched.contains(event.relatedTarget)) return;
      say(typeof tip.text === 'function' ? tip.text(matched) : tip.text);
      return;
    }
  }
}
document.addEventListener('pointerover', event => { if (event.pointerType !== 'touch') showContext(event); });
document.addEventListener('focusin', showContext);
companion?.querySelector('.pet-button')?.addEventListener('click', () => {
  const lines = ['干嘛呢你，快把手拿开～', '再摸的话，我可要挠你啦！⌇●﹏●⌇', '好啦好啦，陪你一起看文章。'];
  say(lines[petReply++ % lines.length]);
});
window.addEventListener('blog:copied', () => say('代码复制好啦，祝你折腾顺利！'));
document.addEventListener('copy', () => say('转载要记得加上出处哦～'));
function welcome() {
  const title = companion?.dataset.pageTitle;
  const hour = new Date().getHours();
  const greeting = hour < 6 ? '夜猫子呀，这么晚了也记得休息噢～' : hour < 12 ? '早上好！今天也要保持好奇呀。' : hour < 18 ? '午后好，看累了就起来走走吧。' : '晚上好，今天过得怎么样？';
  say(title ? `欢迎阅读「${title}」` : greeting, 8000);
}
window.addEventListener('blog:effectschange', () => {
  clearTimeout(timer);
  if (enabled()) say('我回来啦，继续陪你逛小栈。');
  else if (bubble) bubble.hidden = true;
});
if (enabled()) welcome(); else if (bubble) bubble.hidden = true;
