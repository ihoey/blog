export function copyAttribution(text: string, url: string) {
  if (text.trim().length < 88) return '';
  return `作者：Ihoey\n链接：${url}\n来源：梦魇小栈\n著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。`;
}
