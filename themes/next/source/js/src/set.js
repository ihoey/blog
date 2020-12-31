/*
 * @Author: henry
 * @Date:   2016-11-10 22:42:07
 * @Last Modified by: ihoey
 * @Last Modified time: 2019-03-29 16:07:25
 */

console.log(
  "%c梦魇小栈，欢迎您",
  " text-shadow: 0 0 5px #ccc,0 2px 0 #c9c9c9,0 3px 0 #bbb,0 4px 0 #b9b9b9,0 5px 0 #aaa,0 6px 1px rgba(0,0,0,.1),0 0 5px rgba(0,0,0,.1),0 1px 3px rgba(0,0,0,.3),0 3px 5px rgba(0,0,0,.2),0 5px 10px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.2),0 20px 20px rgba(0,0,0,.15);font-size:5em"
);

// 点击爱心
!(function (e, t) {
  function n() {
    c(
      ".heart{width: 10px;height: 10px;position: fixed;background: #f00;transform: rotate(45deg);-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);}.heart:after,.heart:before{content: '';width: inherit;height: inherit;background: inherit;border-radius: 50%;-webkit-border-radius: 50%;-moz-border-radius: 50%;position: fixed;}.heart:after{top: -5px;}.heart:before{left: -5px;}"
    ),
      o(),
      r();
  }

  function r() {
    for (var e = 0; e < d.length; e++)
      d[e].alpha <= 0
        ? (t.body.removeChild(d[e].el), d.splice(e, 1))
        : (d[e].y--,
          (d[e].scale += 0.004),
          (d[e].alpha -= 0.013),
          (d[e].el.style.cssText =
            "left:" +
            d[e].x +
            "px;top:" +
            d[e].y +
            "px;opacity:" +
            d[e].alpha +
            ";transform:scale(" +
            d[e].scale +
            "," +
            d[e].scale +
            ") rotate(45deg);background:" +
            d[e].color +
            ";z-index:99999"));
    requestAnimationFrame(r);
  }

  function o() {
    var t = "function" == typeof e.onclick && e.onclick;
    e.onclick = function (e) {
      t && t(), i(e);
    };
  }

  function i(e) {
    var a = t.createElement("div");
    (a.className = "heart"),
      d.push({
        el: a,
        x: e.clientX - 5,
        y: e.clientY - 5,
        scale: 1,
        alpha: 1,
        color: s(),
      }),
      t.body.appendChild(a);
  }

  function c(e) {
    var a = t.createElement("style");
    a.type = "text/css";
    try {
      a.appendChild(t.createTextNode(e));
    } catch (t) {
      a.styleSheet.cssText = e;
    }
    t.getElementsByTagName("head")[0].appendChild(a);
  }

  function s() {
    return (
      "rgb(" +
      ~~(255 * Math.random()) +
      "," +
      ~~(255 * Math.random()) +
      "," +
      ~~(255 * Math.random()) +
      ")"
    );
  }

  var d = [];
  (e.requestAnimationFrame = (function () {
    return (
      e.requestAnimationFrame ||
      e.webkitRequestAnimationFrame ||
      e.mozRequestAnimationFrame ||
      e.oRequestAnimationFrame ||
      e.msRequestAnimationFrame ||
      function (e) {
        setTimeout(e, 1e3 / 60);
      }
    );
  })()),
    n();
})(window, document);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker.register("/sw.js").then(function () {
      console.log("sw: success!");
    });
  });
}

console.log(
  "\n %c 梦魇|专注于分享 QQ:1058221214 %c https://blog.ihoey.com/ \n\n",
  "color: #FF0000; background: #4bffba; padding:5px 0; border-radius: 5px 5px 5px 5px;",
  "background: #fadfa3; padding:5px 0; border-radius: 5px 5px 5px 5px;"
);
console.log("%c一颗红心向太阳,吼吼~", "text-shadow: 3px 1px 1px grey");
console.info("%c楼上药不能停！", "text-shadow: 3px 1px 1px grey");
console.warn("%c楼上嘴太贱！", "text-shadow: 3px 1px 1px grey");
console.info("%c楼上关你毛事？", "text-shadow: 3px 1px 1px grey");
console.log("%c都不要说啦！", "text-shadow: 3px 1px 1px grey");
console.warn("%c楼主，你的购物车该结账了！", "text-shadow: 3px 1px 1px grey");
var data = [
  {
    品名: "杜雷斯",
    数量: 4,
    价格: 99.0,
  },
  {
    品名: "冈本",
    数量: 3,
    价格: 99.0,
  },
];
console.table(data);
console.info("嘚瑟嘚瑟！哈哈，钱不够不准向我借，最讨厌借钱的人了，哼哼！！");
console.log(
  "%c女朋友就是私有变量，只有我这个类才能调用！",
  "background-image:-webkit-gradient( linear, left top, right top, color-stop(0, #f22), color-stop(0.15, #f2f), color-stop(0.3, #22f), color-stop(0.45, #2ff), color-stop(0.6, #2f2),color-stop(0.75, #2f2), color-stop(0.9, #ff2), color-stop(1, #f22) );color:#fff;-webkit-background-clip: text;font-size:2em;"
);
console.log("程序员A：哎 太累了日子没法过了 怎么才能换行啊");
console.log("程序员B：打回车呀！");

// 控制台图案
(function (global) {
  var character_planar = {
    H: [
      "|ˉ|ˉ|    |ˉ|ˉ|",
      "| | |    | | |",
      "|  ˉˉˉˉˉˉ  | |",
      "| |ˉ|ˉˉˉˉ| | |",
      "| | |    | | |",
      "| | |    | | |",
      "ˉˉˉˉˉ    ˉˉˉˉˉ",
    ],
    Y: [
      "\\ˉ\\ˉ\\  /ˉ/ˉ/",
      " \\ \\ \\/ / / ",
      "  \\ \\/ / /  ",
      "   \\  / /   ",
      "   |  | |   ",
      "   |  | |   ",
      "   ˉˉˉˉˉˉ   ",
    ],
    1: [
      "   /ˉˉˉ|ˉ|    ",
      "  / /| | |    ",
      "  ˉˉˉ| | |    ",
      "     | | |    ",
      "     | | |    ",
      "|ˉˉˉˉˉ ˉˉˉˉ|ˉ|",
      "ˉˉˉˉˉˉˉˉˉˉˉˉˉˉ",
    ],
    2: [
      " /ˉˉˉˉˉˉˉˉ\\ˉ\\ ",
      "/ /ˉ/ˉˉˉˉ\\ \\ \\",
      "ˉˉˉˉ     / /ˉ/",
      "|ˉˉˉˉˉˉˉˉ / / ",
      "| |ˉ|ˉˉˉˉˉˉˉ  ",
      "|  ˉˉˉˉˉˉˉˉ|ˉ|",
      "ˉˉˉˉˉˉˉˉˉˉˉˉˉˉ",
    ],
    3: [
      "|ˉˉˉˉˉˉˉˉˉˉ\\ˉ\\",
      "ˉˉˉˉˉˉˉˉˉ| |ˉ|",
      "|ˉˉˉˉˉˉˉˉ  /ˉ/",
      "ˉˉˉˉˉˉˉˉˉ| \\ˉ\\",
      "         / |ˉ|",
      "|ˉˉˉˉˉˉˉˉ  /ˉ/",
      "ˉˉˉˉˉˉˉˉˉˉˉˉˉ ",
    ],
    4: [
      "    /ˉˉˉ|ˉ|   ",
      "   / /| | |   ",
      "  / / | | |   ",
      " / / /| | |   ",
      "|  ˉˉˉˉ ˉˉˉ|ˉ|",
      "ˉˉˉˉˉˉ| |ˉ|ˉˉˉ",
      "      ˉˉˉˉˉ   ",
    ],
    5: [
      "|ˉˉˉˉˉˉˉˉˉˉ|ˉ|",
      "| |ˉ|ˉˉˉˉˉˉˉˉˉ",
      "\\ ˉˉˉˉˉˉˉˉ\\ˉ\\ ",
      " ˉˉˉˉˉˉˉˉ\\ \\ \\",
      "\\ˉ\\ˉ\\    / /ˉ/",
      " \\ ˉˉˉˉˉˉ / / ",
      "  ˉˉˉˉˉˉˉˉˉˉ  ",
    ],
    6: [
      " /ˉˉˉˉˉˉˉˉ|ˉ| ",
      "| /ˉ/ˉˉˉˉˉˉˉˉ ",
      "| ˉˉˉˉˉˉˉˉ\\ˉ\\ ",
      "| |ˉ|ˉˉˉˉ\\ \\ \\",
      "\\ \\ \\    / /ˉ/",
      " \\ ˉˉˉˉˉˉ / / ",
      "  ˉˉˉˉˉˉˉˉˉˉ  ",
    ],
    7: [
      "|ˉˉˉˉˉˉˉˉˉˉ|ˉ|",
      " ˉˉˉˉˉˉˉ/ /ˉ/ ",
      "       / / /  ",
      "      / / /   ",
      "     / / /    ",
      "    / / /     ",
      "    ˉˉˉˉ      ",
    ],
    8: [
      " /ˉˉˉˉˉˉˉˉ\\ˉ\\ ",
      "| |ˉTˉˉˉˉ| |ˉ|",
      "\\  ˉˉˉˉˉˉ  /ˉ/",
      "/ /ˉ/ˉˉˉˉ\\ \\ˉ\\",
      "| \\ \\    / |ˉ|",
      "\\  ˉˉˉˉˉˉ  /ˉ/",
      " ˉˉˉˉˉˉˉˉˉˉˉˉ ",
    ],
    9: [
      " /ˉˉˉˉˉˉˉˉ\\ˉ\\ ",
      "| |ˉTˉˉˉˉ| |ˉ|",
      "| | |    | | |",
      " \\ ˉˉˉˉˉˉ  | |",
      "\\ˉ\\ˉ\\ˉˉˉˉ| | |",
      " \\ ˉˉˉˉˉˉ  /ˉ/",
      "  ˉˉˉˉˉˉˉˉˉˉˉ ",
    ],
    0: [
      " /ˉˉˉˉˉˉˉ\\ˉ\\ ",
      "/ /ˉ/ˉˉˉ\\ \\ \\",
      "| | |   | |ˉ|",
      "| | |   | | |",
      "\\ \\ \\   / /ˉ/",
      " \\ ˉˉˉˉˉ / / ",
      "  ˉˉˉˉˉˉˉˉˉ  ",
    ],
  };

  function Alphabet(str) {
    var result = "\n";
    var strArr = str.split("\n");
    for (var k = 0; k < strArr.length; k++) {
      for (var j = 0; j < 7; j++) {
        for (var i = 0, length = strArr[k].length; i < length; i++) {
          result = result + character_planar[strArr[k][i]][j];
        }
        result = result + "\n";
      }
    }
    return result;
  }

  global.Alphabet = Alphabet;
})(window);

console.log(Alphabet("HY1121"));

// 标题变化
window.onload = function () {
  var OriginTitile = document.title;
  var titleTime;
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      $('[rel="icon"]').attr("href", "/images/fail.ico");
      document.title = "╭(°A°`)╮ 页面崩溃啦 ~ 快回来看看~ | 梦魇小栈！";
      clearTimeout(titleTime);
    } else {
      $('[rel="icon"]').attr("href", "/favicon.ico");
      document.title = "(ฅ>ω<*ฅ) 噫又好了~" + OriginTitile;
      titleTime = setTimeout(function () {
        document.title = OriginTitile;
      }, 2000);
    }
  });

  $(".post-title .post-title-link,.post-button .btn").hover(
    function () {
      $(this).stop().animate(
        {
          marginLeft: "10px",
        },
        200
      );
    },
    function () {
      $(this).stop().animate(
        {
          marginLeft: "0px",
        },
        400
      );
    }
  );

  $.getJSON("https://v1.hitokoto.cn/", function (s) {
    $("#hitokoto").text("" + s.hitokoto + "  来自于 " + s.from);
  });

  //打赏
  var QRBox = $("#QRBox");
  var MainBox = $("#MainBox");

  function showQR(QR) {
    if (QR) MainBox.css("background-image", "url(" + QR + ")");
    $("#DonateText,#donateBox,#github").addClass("blur");
    QRBox.fadeIn(300, function () {
      MainBox.addClass("showQR");
    });
  }

  $("#donateBox>li").click(function () {
    if ($(this).attr("data-img")) showQR($(this).attr("data-img"));
  });

  MainBox.click(function () {
    MainBox.removeClass("showQR").addClass("hideQR");
    setTimeout(function () {
      QRBox.fadeOut(300, function () {
        MainBox.removeClass("hideQR");
      });
      $("#DonateText,#donateBox,#github").removeClass("blur");
    }, 600);
  });

  //Message

  function renderTip(template, context) {
    var tokenReg = /(\\)?\{([^\{\}\\]+)(\\)?\}/g;
    return template.replace(tokenReg, function (word, slash1, token, slash2) {
      if (slash1 || slash2) {
        return word.replace("\\", "");
      }
      var variables = token.replace(/\s/g, "").split(".");
      var currentObject = context;
      var i, length, variable;
      for (i = 0, length = variables.length; i < length; ++i) {
        variable = variables[i];
        currentObject = currentObject[variable];
        if (currentObject === undefined || currentObject === null) return "";
      }
      return currentObject;
    });
  }

  String.prototype.renderTip = function (context) {
    return renderTip(this, context);
  };

  var re = /x/;
  console.log(re);
  re.toString = function () {
    showMessage("哈哈，你打开了控制台，是想要看看我的秘密吗？", 5000);
    return "";
  };

  document.addEventListener("copy", function (e) {
    showMessage(
      '<span style="color:red;">你都复制了些什么呀，转载要记得加上出处哦~~</span>',
      5000
    );
    var seletedText = window.getSelection();
    if (seletedText.toString().length < 88) {
      return;
    }
    addCopyright(e);
    e.preventDefault();
  });

  function addCopyright(e) {
    var node = document.createElement("div");
    node.appendChild(window.getSelection().getRangeAt(0).cloneContents());

    var content = [
      `<div>${node.innerHTML}<br />`,
      "作者：Ihoey",
      `链接：${location.href}`,
      "来源：梦魇小栈",
      "著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。",
      "</div>",
    ];

    var html = content.join("<br />");
    content[0] = `${window.getSelection().toString().replace("\n\n", "\n")}\n`;
    delete content[content.length - 1];
    var text = content.join("\n");

    if (e.clipboardData) {
      e.clipboardData.setData("text/html", html);
      e.clipboardData.setData("text/plain", text);
    } else if (window.clipboardData) {
      return window.clipboardData.setData("text", text);
    }
  }

  function initTips() {
    $.ajax({
      cache: true,
      url: `${location.origin}/message.json`,
      dataType: "json",
      success: function (result) {
        $.each(result.mouseover, function (index, tips) {
          $(tips.selector).mouseover(function () {
            var text = tips.text;
            if (Array.isArray(tips.text))
              text =
                tips.text[Math.floor(Math.random() * tips.text.length + 1) - 1];
            text = text.renderTip({
              text: $(this).text(),
            });
            showMessage(text, 3000);
          });
        });
        $.each(result.click, function (index, tips) {
          $(tips.selector).click(function () {
            var text = tips.text;
            if (Array.isArray(tips.text))
              text =
                tips.text[Math.floor(Math.random() * tips.text.length + 1) - 1];
            text = text.renderTip({
              text: $(this).text(),
            });
            showMessage(text, 3000);
          });
        });
      },
    });
  }
  initTips();

  (function () {
    var text;
    if (document.referrer !== "") {
      var referrer = document.createElement("a");
      referrer.href = document.referrer;
      text =
        '嗨！来自 <span style="color:#0099cc;">' +
        referrer.hostname +
        "</span> 的朋友！";
      var domain = referrer.hostname.split(".")[1];
      if (domain == "baidu") {
        text =
          '嗨！ 来自 百度搜索 的朋友！<br>欢迎访问<span style="color:#0099cc;">「 ' +
          document.title.split(" - ")[0] +
          " 」</span>";
      } else if (domain == "so") {
        text =
          '嗨！ 来自 360搜索 的朋友！<br>欢迎访问<span style="color:#0099cc;">「 ' +
          document.title.split(" - ")[0] +
          " 」</span>";
      } else if (domain == "google") {
        text =
          '嗨！ 来自 谷歌搜索 的朋友！<br>欢迎访问<span style="color:#0099cc;">「 ' +
          document.title.split(" - ")[0] +
          " 」</span>";
      }
    } else {
      if (window.location.href == `${location.origin}`) {
        //主页URL判断，需要斜杠结尾
        var now = new Date().getHours();
        if (now > 23 || now <= 5) {
          text = "你是夜猫子呀？这么晚还不睡觉，明天起的来嘛？";
        } else if (now > 5 && now <= 7) {
          text = "早上好！一日之计在于晨，美好的一天就要开始了！";
        } else if (now > 7 && now <= 11) {
          text = "上午好！工作顺利嘛，不要久坐，多起来走动走动哦！";
        } else if (now > 11 && now <= 14) {
          text = "中午了，工作了一个上午，现在是午餐时间！";
        } else if (now > 14 && now <= 17) {
          text = "午后很容易犯困呢，今天的运动目标完成了吗？";
        } else if (now > 17 && now <= 19) {
          text = "傍晚了！窗外夕阳的景色很美丽呢，最美不过夕阳红~~";
        } else if (now > 19 && now <= 21) {
          text = "晚上好，今天过得怎么样？";
        } else if (now > 21 && now <= 23) {
          text = "已经这么晚了呀，早点休息吧，晚安~~";
        } else {
          text = "嗨~ 快来逗我玩吧！";
        }
      } else {
        text =
          '欢迎阅读<span style="color:#0099cc;">「 ' +
          document.title.split(" - ")[0] +
          " 」</span>";
      }
    }
    showMessage(text, 12000);
  })();

  window.setInterval(showHitokoto, 30000);

  function showHitokoto() {
    $.getJSON("https://v1.hitokoto.cn/", function (result) {
      showMessage(result.hitokoto, 5000);
    });
  }

  function showMessage(text, timeout) {
    if (Array.isArray(text))
      text = text[Math.floor(Math.random() * text.length + 1) - 1];
    $(".message").stop();
    $(".message").html(text).fadeTo(200, 1);
    timeout = timeout || 5000;
    hideMessage(timeout);
  }

  function hideMessage(timeout) {
    $(".message").stop().css("opacity", 1);
    if (timeout === null) timeout = 5000;
    $(".message").delay(timeout).fadeTo(200, 0);
  }

  function UA(_this) {
    function _indexOf(name) {
      return $(_this).text().indexOf(name) == 0;
    }

    function _prepend(name) {
      $(_this).prepend(
        '<img class="' +
          name +
          '" src="https://cdn.ihoey.com/ua_icon/' +
          name +
          '.svg">'
      );
    }

    if (_indexOf("Safari")) {
      _prepend("Safari");
    } else if (_indexOf("Mac") || _indexOf("iOS")) {
      _prepend("Apple");
    } else if (_indexOf("Chrome")) {
      _prepend("Chrome");
    } else if (_indexOf("Firefox")) {
      _prepend("Firefox");
    } else if (_indexOf("Windows 10")) {
      _prepend("Windows10");
    } else if (
      _indexOf("Windows") ||
      _indexOf("Windows 7") ||
      _indexOf("Windows 8") ||
      _indexOf("Windows 9")
    ) {
      _prepend("Windows7");
    } else if (_indexOf("Android")) {
      _prepend("Android");
    } else if (_indexOf("Ubuntu")) {
      _prepend("Ubuntu");
    } else if (_indexOf("Linux")) {
      _prepend("Linux");
    } else if (_indexOf("Microsoft Edge") || _indexOf("MSIE")) {
      _prepend("IE");
    } else if (_indexOf("Sogou")) {
      _prepend("Sogou");
    } else if (_indexOf("XiaoMi")) {
      _prepend("Xiaomi");
    }
    addUBZime_g();
  }

  function isUA(_this) {
    if ($(window).width() <= 520) {
      $(_this).text($(_this).text().split(" ").shift());
    }
    UA(_this);
  }
  var addUVTime_g = setInterval(function () {
    if ($(".vhead:first .vsys>img").length == 0) {
      $(".vhead .vsys").each(function () {
        isUA(this);
      });
    } else {
      clearInterval(addUVTime_g);
    }
  }, 100);

  function addUBZime_g() {
    $('.vhead a[href*="ihoey.com"]:not(.bozhu)')
      .addClass("bozhu")
      .after('<span class = "bozhu vsys">博主</span>');
  }

  // 点击提交
  $(".vsubmit.vbtn").on("click", function () {
    var addUVTime = setInterval(function () {
      if ($(".vhead:first .vsys>img").length == 0) {
        $(".vhead:first .vsys").each(function () {
          isUA(this);
        });
      } else {
        clearInterval(addUVTime);
      }
    }, 1000);
  });

  // 点击翻页
  $(document).on("click", ".vpage .page-numbers", function () {
    var addUVTime = setInterval(function () {
      if ($(".vhead:last .vsys>img").length == 0) {
        $(".vhead .vsys").each(function () {
          if ($(this).html().indexOf("img") == -1) {
            isUA(this);
          }
        });
      } else {
        clearInterval(addUVTime);
      }
    }, 1000);
  });

  const timeToNowDOM = document.querySelector("#time-to-now");
  if (timeToNowDOM) {
    const startTimestamp = new Date(2015, 11, 21).getTime();
    const updateTimeStr = () => {
      let offset = parseInt((new Date().getTime() - startTimestamp) / 1000, 10),
        day = Math.floor(offset / 86400),
        hour = Math.floor((offset % 86400) / 3600),
        minute = Math.floor(((offset % 86400) % 3600) / 60),
        second = Math.floor(((offset % 86400) % 3600) % 60);
      timeToNowDOM.innerText =
        day + "天" + hour + "小时" + minute + "分钟" + second + "秒";
      setTimeout(updateTimeStr, 500);
    };
    setTimeout(updateTimeStr, 500);
  }
};
