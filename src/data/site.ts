// Public site details used when exchanging friend links.
export const site = {
  name: '梦魇小栈',
  motto: '心，若没有栖息的地方，到哪里都是流浪……',
  subtitle: '专注于分享',
  url: 'https://blog.ihoey.com',
  description: '心，若没有栖息的地方，到哪里都是流浪......',
  avatar:
    'https://cdn.ihoey.com/avatar.png?imageMogr2/thumbnail/200x200/format/png/blur/1x0/quality/75|imageslim',
} as const;

export const navigation = [
  ['/', '首页', 'home'],
  ['/archives/index.html', '归档', 'archive'],
  ['/tags/index.html', '标签', 'tag'],
  ['/links/index.html', '友链', 'link'],
  ['/guestbook/index.html', '留言', 'comment'],
  ['/about/index.html', '关于', 'user'],
] as const;
