"use strict";

hexo.extend.helper.register("hexo_env", function (type) {
  return this.env[type];
});

hexo.extend.helper.register("next_env", function (type) {
  var env = require("../package.json");
  return env[type];
});

hexo.extend.helper.register("item_active", function (path, className) {
  var canonical = this.page.canonical_path;
  var current = this.url_for(canonical).replace("index.html", "", "g");
  var result = "";

  if (current.indexOf(path) !== -1) {
    if (path !== "/" || path === current) {
      result = " " + className;
    }
  }
  return result;
});

hexo.extend.helper.register("post_nav", function (post) {
  const theme = hexo.theme.config;
  if (theme.post_navigation === false || (!post.prev && !post.next)) return "";
  const prev = theme.post_navigation === "right" ? post.prev : post.next;
  const next = theme.post_navigation === "right" ? post.next : post.prev;
  const left = prev
    ? `
    <a href="${this.url_for(prev.path)}" rel="prev" title="${prev.title}">
      <i class="fa fa-chevron-left"></i> ${prev.title}
    </a>`
    : "";
  const right = next
    ? `
    <a href="${this.url_for(next.path)}" rel="next" title="${next.title}">
      ${next.title} <i class="fa fa-chevron-right"></i>
    </a>`
    : "";
  return `
    <div class="post-nav">
      <div class="post-nav-item">${left}</div>
      <div class="post-nav-item">${right}</div>
    </div>`;
});
