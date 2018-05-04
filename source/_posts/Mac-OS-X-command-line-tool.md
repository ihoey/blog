---
title: 不可不知的Mac OS X专用命令行工具(持续更新中)
date: 2017-11-21 13:45:05
tags:
  - Mac
  - Mac OS
categories:
  - Mac
---

`OS X` 的终端下通用很多 `Unix` 的工具和脚本。如果从 `Linux` 迁移到 `OS X` 会发现很多熟悉的命令和脚本工具，其实并没有任何区别。

但是 `OS X` 也提供了很多其他系统所没有的特别的命令行工具。我们推荐 `8` 个这类的工具，希望有助于提高在 `Mac` 的命令行环境下的效率。

<!-- more -->

## open

`open` 命令用于打开文件、目录或执行程序。就等同于在命令行模式下，重复图形界面“双击”的动作。例如这个命令与在 `Finder` 中双击 `Safari` 是一样的：

```bash
`open /Applications/Safari.app/`
```

如果 `open` 一个文件，则会使用关联的程序打开之。例如 `open screenshot.png` 会在 `Preview` 中查看图片。

可以使用 `-a` 选项要求自行选择打开的程序，或使用 `-e` 强制在 `TextEdit` 中编辑此文件。

`open` 一个目录会在 `Finder` 窗口中打开此目录。一个很有用的技巧是 `open .` 打开当前目录。

`Finder` 和终端的交互是双向的——把文件从 `Finder` 中拖入终端，就等同于把文件的完整路径粘贴到命令行中。

## pbcopy 和 pbpaste

这两个工具可以打通命令行和剪贴板。当然用鼠标操作复制粘贴也可以——但这两个工具的真正威力，发挥在将其用作Unix工具的时候。意思就是说：可以将这两个工具用作管道、IO重定向以及和其他命令的整合。例如：

```bash
ls ~ | pbcopy
```

可以将主目录的文件列表复制到剪贴板。

也可以把任意文件的内容读入剪贴板：

```bash
pbcopy < blogpost.txt
```

做点更疯狂的尝试：获取最新 Google 纪念徽标（doodle）的 URL 并复制到剪贴板：

```bash
curl http://www.google.com/doodles#oodles/archive | grep -A5 'latest-doodle on' | grep 'img src' | sed s/.*'<img src="\/\/'/''/ | sed s/'" alt=".*'/''/ | pbcopy
```

使用管道语法配合 `pbcopy` 工具可以简单的抓取命令的输出，而不必向上滚动翻阅终端窗口。可以用于和他人分享命令行的标准和错误输出。 `pbcopy` 和 `pbpaste` 也可以用于自动化或加速执行一些事情。例如把一些邮件的主题存为任务列表，就可以先从 `Mail.app` 中复制主题，再运行：

```bash
pbpaste >> tasklist.txt
```

## mdfind

许多 `Linux` 用户都发现 `Linux` 下查找文件的方法在 `OS X` 上不好用。当然经典的 `Unix find` 命令总是可以，但既然 `OS X` 有杀手级搜索工具 `Spotlight` ，为什么不在命令行上也使用一下呢？

这就是mdfind命令了。 `Spotlight` 能做的查找， `mdfind` 也能做。包括搜索文件的内容和元数据（`metadata`）。

`mdfind`还提供更多的搜索选项。例如`-onlyin`选项可以约束搜索范围为一个目录：

```bash
mdfind -onlyin ~/Documents essay
```

`mdfind` 的索引数据库在后台自动更新，不过你也可以使用 `mdutil` 工具诊断数据库的问题，诊断 `mdfind` 的问题也等同于诊断 `Spotlight` 。如果 `Spotlight` 的工作不正确，`mdutil -E `命令可以强制重建索引数据库。也可以用 `mdutil -i` 彻底关闭文件索引。

## screencapture

`screencapture` 命令可以截图。和 `Grab.app` 与 `cmd + shift + 3` 或 `cmd + shift + 4` 热键相似，但更加的灵活。

抓取包含鼠标光标的全屏幕，并以 `image.png` 插入到新邮件的附件中：

```bash
screencapture -C -M image.png
```

用鼠标选择抓取窗口（及阴影）并复制到剪贴板：

```bash
screencapture -c -W
```

延时10秒后抓屏，并在Preview中打开之：

```bash
screencapture -T 10 -P image.png
```

用鼠标截取一个矩形区域，抓取后存为pdf文件：

```bash
screencapture -s -t pdf image.pdf
```

更多用法请参阅 `screencapture --help` 。

## launchctl

`launchctl` 管理 `OS X` 的启动脚本，控制启动计算机时需要开启的服务。也可以设置定时执行特定任务的脚本，就像 `Linux cron` 一样。

例如，开机时自动启动 `Apache` 服务器：

```bash
sudo launchctl load -w /System/Library/LaunchDaemons/org.apache.httpd.plist
```

运行 `launchctl list` 显示当前的启动脚本。 `sudo launchctl unload [path/to/script]` 停止正在运行的启动脚本，再加上 `-w` 选项即可去除开机启动。用这个方法可以一次去除 `Adobe` 或 `Microsoft Office` 所附带的所有“自动更新”后台程序。

`Launchd` 脚本存储在以下位置：

```bash
~/Library/LaunchAgents
/Library/LaunchAgents
/Library/LaunchDaemons
/System/Library/LaunchAgents
/System/Library/LaunchDaemons
```

<!-- 启动脚本的格式可以参考这篇blog，或苹果开发者中心的文章。你也可以使用Lingon应用来完全取代命令行。 -->

## say

`say` 是一个文本转语音（`TTS`）的有趣的工具，引擎和 `OS X` 使用的一样也是 `VoiceOver` 。如果不加其他选项，则会简单的语音朗读你给定的字符串：

```bash
say "Never trust a computer you can't lift."
用-f选项朗读特定文本文件，-o选项将朗读结果存为音频文件而不是播放：
```

```bash
say -f mynovel.txt -o myaudiobook.aiff
```

`say` 命令可以用于在脚本中播放警告或提示。例如你可以设置 `Automator` 或 `Hazel` 脚本处理文件，并在任务完成时用 `say` 命令语音提示。

最好玩（不过也负罪感十足）的用法是：通过 `SSH` 连接到朋友或同事的计算机，然后用 `say` 命令给他们一个大大大惊喜……

可以在系统设置 `（System Preferences）` 的字典和语音 `（Dictation & Speech）` 选项中调整系统的语音选项甚至是语音的语言。

## diskutil

`diskutil` 是 `OS X` 磁盘工具应用的命令行版。既可以完成图形界面应用的所有任务，也可以做一些全盘填0、全盘填随机数等额外的任务。先使用 `diskutil list` 查看所有磁盘的列表和所在路径，然后对特定的磁盘执行命令。

警告：不正确使用 `diskutil` 可能意外的破坏磁盘数据。请小心。

## brew

`Homebrew` 程序提供的 `brew` ，严格来讲不是一个 `OS X` 的原生命令，但任何一个 `OS X` 的专业用户都不会错过它。“ `OS X` 缺少的包管理器”这个评价是恰如其分的。如果你曾经在 `Linux` 上使用过 `apt-get` （或其他包管理器——译者注），你就会发现 `Homebrew` 基本上是一样的。

使用 `brew` 可以简单的获取数千种开源工具和函数库。例如 `brew install imagemagick` 就可以安装 `ImageMagick` （几乎可以处理任何图像问题，转换任何格式的图像工具）， `brew install node` 可以安装 `Node.js` （当前大热的服务器端 `JavaScript` 编程工具）。

也可以通过 `Homebrew` 做有趣的事情： `brew install archey` 会安装 `Archey` （在启动命令行时显示苹果 `LOGO` 和计算机硬件参数的小工具）。

![item2](https://cdn.dode.top/item2.png)

`Homebrew` 能安装的工具数量庞大，并且一直保持更新。`Homebrew` 最棒的一点是：所有的文件都被约束在 `/usr/local/` 一个位置之下。也就是说可以通过 `Homebrew` 安装新版软件的同时，保持系统内置的依赖库或其他软件不变。同时如果想彻底删除 `Homebrew` ，也变得非常简单。

（注：删除 `Homebrew` 最好还是不要直接删除 `/usr/local/` 。应当用这个卸载脚本点击预览。）

```bash
#!/bin/sh
# Just copy and paste the lines below (all at once, it won't work line by line!)
# MAKE SURE YOU ARE HAPPY WITH WHAT IT DOES FIRST! THERE IS NO WARRANTY!

function abort {
  echo "$1"
  exit 1
}

set -e

/usr/bin/which -s git || abort "brew install git first!"
test -d /usr/local/.git || abort "brew update first!"

cd `brew --prefix`
git checkout master
git ls-files -z | pbcopy
rm -rf Cellar
bin/brew prune
pbpaste | xargs -0 rm
rm -r Library/Homebrew Library/Aliases Library/Formula Library/Contributions
test -d Library/LinkedKegs && rm -r Library/LinkedKegs
rmdir -p bin Library share/man/man1 2> /dev/null
rm -rf .git
rm -rf ~/Library/Caches/Homebrew
rm -rf ~/Library/Logs/Homebrew
rm -rf /Library/Caches/Homebrew
```

## 在 访达 中预览 webp 格式图片

`WebP`文件的快速查看插件

```bash
curl -L https://raw.github.com/emin/WebPQuickLook/master/install.sh | sh
```
