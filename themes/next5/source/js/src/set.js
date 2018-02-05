/*
 * @Author: henry
 * @Date:   2016-11-10 22:42:07
 * @Last Modified by: ihoey
 * @Last Modified time: 2018-01-23 20:46:10
 */

console.log("%c梦魇小栈，欢迎您", " text-shadow: 0 0 5px #ccc,0 2px 0 #c9c9c9,0 3px 0 #bbb,0 4px 0 #b9b9b9,0 5px 0 #aaa,0 6px 1px rgba(0,0,0,.1),0 0 5px rgba(0,0,0,.1),0 1px 3px rgba(0,0,0,.3),0 3px 5px rgba(0,0,0,.2),0 5px 10px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.2),0 20px 20px rgba(0,0,0,.15);font-size:5em");

// 点击爱心
! function(e, t, a) {
  function n() {
    c(".heart{width: 10px;height: 10px;position: fixed;background: #f00;transform: rotate(45deg);-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);}.heart:after,.heart:before{content: '';width: inherit;height: inherit;background: inherit;border-radius: 50%;-webkit-border-radius: 50%;-moz-border-radius: 50%;position: fixed;}.heart:after{top: -5px;}.heart:before{left: -5px;}"), o(), r()
  }

  function r() {
    for (var e = 0; e < d.length; e++) d[e].alpha <= 0 ? (t.body.removeChild(d[e].el), d.splice(e, 1)) : (d[e].y--, d[e].scale += .004, d[e].alpha -= .013, d[e].el.style.cssText = "left:" + d[e].x + "px;top:" + d[e].y + "px;opacity:" + d[e].alpha + ";transform:scale(" + d[e].scale + "," + d[e].scale + ") rotate(45deg);background:" + d[e].color + ";z-index:99999");
    requestAnimationFrame(r)
  }

  function o() {
    var t = "function" == typeof e.onclick && e.onclick;
    e.onclick = function(e) {
      t && t(), i(e)
    }
  }

  function i(e) {
    var a = t.createElement("div");
    a.className = "heart", d.push({
      el: a,
      x: e.clientX - 5,
      y: e.clientY - 5,
      scale: 1,
      alpha: 1,
      color: s()
    }), t.body.appendChild(a)
  }

  function c(e) {
    var a = t.createElement("style");
    a.type = "text/css";
    try {
      a.appendChild(t.createTextNode(e))
    } catch (t) {
      a.styleSheet.cssText = e
    }
    t.getElementsByTagName("head")[0].appendChild(a)
  }

  function s() {
    return "rgb(" + ~~(255 * Math.random()) + "," + ~~(255 * Math.random()) + "," + ~~(255 * Math.random()) + ")"
  }

  var d = [];
  e.requestAnimationFrame = function() {
    return e.requestAnimationFrame || e.webkitRequestAnimationFrame || e.mozRequestAnimationFrame || e.oRequestAnimationFrame || e.msRequestAnimationFrame || function(e) {
      setTimeout(e, 1e3 / 60)
    }
  }(), n()
}(window, document);


console.log("\n %c 梦魇|专注于分享 QQ:1058221214 %c http://www.dode.top \n\n", "color: #FF0000; background: #4bffba; padding:5px 0; border-radius: 5px 5px 5px 5px;", "background: #fadfa3; padding:5px 0; border-radius: 5px 5px 5px 5px;");
console.log('%c一颗红心向太阳,吼吼~', 'text-shadow: 3px 1px 1px grey');
console.info('%c楼上药不能停！', 'text-shadow: 3px 1px 1px grey');
console.warn('%c楼上嘴太贱！', 'text-shadow: 3px 1px 1px grey');
console.info('%c楼上关你毛事？', 'text-shadow: 3px 1px 1px grey');
console.log('%c都不要说啦！', 'text-shadow: 3px 1px 1px grey');
console.warn('%c楼主，你的购物车该结账了！', 'text-shadow: 3px 1px 1px grey');
var data = [{ '品名': '杜雷斯', '数量': 4, '价格': 99.00, }, { '品名': '冈本', '数量': 3, '价格': 99.00, }];
console.table(data);
console.info('嘚瑟嘚瑟！哈哈，钱不够不准向我借，最讨厌借钱的人了，哼哼！！');
console.log('%c女朋友就是私有变量，只有我这个类才能调用！', 'background-image:-webkit-gradient( linear, left top, right top, color-stop(0, #f22), color-stop(0.15, #f2f), color-stop(0.3, #22f), color-stop(0.45, #2ff), color-stop(0.6, #2f2),color-stop(0.75, #2f2), color-stop(0.9, #ff2), color-stop(1, #f22) );color:transparent;-webkit-background-clip: text;font-size:2em;');
console.log('程序员A：哎 太累了日子没法过了 怎么才能换行啊');
console.log('程序员B：打回车呀！');

// 控制台图案
(function(global) {
  var character_planar = {
    H: [
      '|ˉ|ˉ|    |ˉ|ˉ|',
      '| | |    | | |',
      '|  ˉˉˉˉˉˉ  | |',
      '| |ˉ|ˉˉˉˉ| | |',
      '| | |    | | |',
      '| | |    | | |',
      'ˉˉˉˉˉ    ˉˉˉˉˉ',
    ],
    Y: [
      '\\ˉ\\ˉ\\  /ˉ/ˉ/',
      ' \\ \\ \\/ / / ',
      '  \\ \\/ / /  ',
      '   \\  / /   ',
      '   |  | |   ',
      '   |  | |   ',
      '   ˉˉˉˉˉˉ   ',
    ],
    1: ['   /ˉˉˉ|ˉ|    ',
      '  / /| | |    ',
      '  ˉˉˉ| | |    ',
      '     | | |    ',
      '     | | |    ',
      '|ˉˉˉˉˉ ˉˉˉˉ|ˉ|',
      'ˉˉˉˉˉˉˉˉˉˉˉˉˉˉ'
    ],
    2: [' /ˉˉˉˉˉˉˉˉ\\ˉ\\ ',
      '/ /ˉ/ˉˉˉˉ\\ \\ \\',
      'ˉˉˉˉ     / /ˉ/',
      '|ˉˉˉˉˉˉˉˉ / / ',
      '| |ˉ|ˉˉˉˉˉˉˉ  ',
      '|  ˉˉˉˉˉˉˉˉ|ˉ|',
      'ˉˉˉˉˉˉˉˉˉˉˉˉˉˉ'
    ],
    3: ['|ˉˉˉˉˉˉˉˉˉˉ\\ˉ\\',
      'ˉˉˉˉˉˉˉˉˉ| |ˉ|',
      '|ˉˉˉˉˉˉˉˉ  /ˉ/',
      'ˉˉˉˉˉˉˉˉˉ| \\ˉ\\',
      '         / |ˉ|',
      '|ˉˉˉˉˉˉˉˉ  /ˉ/',
      'ˉˉˉˉˉˉˉˉˉˉˉˉˉ '
    ],
    4: ['    /ˉˉˉ|ˉ|   ',
      '   / /| | |   ',
      '  / / | | |   ',
      ' / / /| | |   ',
      '|  ˉˉˉˉ ˉˉˉ|ˉ|',
      'ˉˉˉˉˉˉ| |ˉ|ˉˉˉ',
      '      ˉˉˉˉˉ   '
    ],
    5: ['|ˉˉˉˉˉˉˉˉˉˉ|ˉ|',
      '| |ˉ|ˉˉˉˉˉˉˉˉˉ',
      '\\ ˉˉˉˉˉˉˉˉ\\ˉ\\ ',
      ' ˉˉˉˉˉˉˉˉ\\ \\ \\',
      '\\ˉ\\ˉ\\    / /ˉ/',
      ' \\ ˉˉˉˉˉˉ / / ',
      '  ˉˉˉˉˉˉˉˉˉˉ  '
    ],
    6: [' /ˉˉˉˉˉˉˉˉ|ˉ| ',
      '| /ˉ/ˉˉˉˉˉˉˉˉ ',
      '| ˉˉˉˉˉˉˉˉ\\ˉ\\ ',
      '| |ˉ|ˉˉˉˉ\\ \\ \\',
      '\\ \\ \\    / /ˉ/',
      ' \\ ˉˉˉˉˉˉ / / ',
      '  ˉˉˉˉˉˉˉˉˉˉ  '
    ],
    7: ['|ˉˉˉˉˉˉˉˉˉˉ|ˉ|',
      ' ˉˉˉˉˉˉˉ/ /ˉ/ ',
      '       / / /  ',
      '      / / /   ',
      '     / / /    ',
      '    / / /     ',
      '    ˉˉˉˉ      '
    ],
    8: [' /ˉˉˉˉˉˉˉˉ\\ˉ\\ ',
      '| |ˉTˉˉˉˉ| |ˉ|',
      '\\  ˉˉˉˉˉˉ  /ˉ/',
      '/ /ˉ/ˉˉˉˉ\\ \\ˉ\\',
      '| \\ \\    / |ˉ|',
      '\\  ˉˉˉˉˉˉ  /ˉ/',
      ' ˉˉˉˉˉˉˉˉˉˉˉˉ '
    ],
    9: [' /ˉˉˉˉˉˉˉˉ\\ˉ\\ ',
      '| |ˉTˉˉˉˉ| |ˉ|',
      '| | |    | | |',
      ' \\ ˉˉˉˉˉˉ  | |',
      '\\ˉ\\ˉ\\ˉˉˉˉ| | |',
      ' \\ ˉˉˉˉˉˉ  /ˉ/',
      '  ˉˉˉˉˉˉˉˉˉˉˉ '
    ],
    0: [' /ˉˉˉˉˉˉˉ\\ˉ\\ ',
      '/ /ˉ/ˉˉˉ\\ \\ \\',
      '| | |   | |ˉ|',
      '| | |   | | |',
      '\\ \\ \\   / /ˉ/',
      ' \\ ˉˉˉˉˉ / / ',
      '  ˉˉˉˉˉˉˉˉˉ  '
    ],
  }

  console.error('这个错误是特意为了吸引你来看console的！')

  function Alphabet(str, mode) {
    if (mode === 'planar') {
      var character = character_planar;
    }
    var result = '\n';
    var strArr = str.split('\n');
    for (var k = 0; k < strArr.length; k++) {
      for (var j = 0; j < 7; j++) {
        for (var i = 0, length = strArr[k].length; i < length; i++) {
          result = result + character[strArr[k][i]][j];
        }
        result = result + '\n';
      }
    }
    return result;
  }

  global.Alphabet = Alphabet;
})(window)

console.log(Alphabet('HY1121', 'planar'));

// 标题变化
window.onload = function() {
  var OriginTitile = document.title;
  var titleTime;
  document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
      $('[rel="icon"]').attr('href', "/img/TEP.ico");
      document.title = '╭(°A°`)╮ 页面崩溃啦 ~ 快回来看看~ | 梦魇小栈！';
      clearTimeout(titleTime);
    } else {
      $('[rel="icon"]').attr('href', "/favicon.ico");
      document.title = '(ฅ>ω<*ฅ) 噫又好了~' + OriginTitile;
      titleTime = setTimeout(function() {
        document.title = OriginTitile;
      }, 2000);
    }
  });

  $('.post-title .post-title-link,.post-button .btn').hover(function () {
    $(this).stop().animate({
      'marginLeft': '10px'
    }, 200);
  }, function() {
    $(this).stop().animate({
      'marginLeft': '0px'
    }, 400);
  });

  $.ajax({
      url: 'https://sslapi.hitokoto.cn/',
      type: 'GET',
      dataType: 'json'
    })
    .done(function(data) {
      html = '' + data.hitokoto + '  来自于 ' + data.from;
      $('#hitokoto').text(html);
    })
}
