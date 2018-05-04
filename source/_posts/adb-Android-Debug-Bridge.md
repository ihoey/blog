---
title: adb(Android Debug Bridge，Android调试桥)常用命令
date: 2016-12-18 16:18:21
tags:
  - adb
  - Android
  - adb命令
categories: Android
---

说到 `ADB` 大家应该都不陌生，即 `Android Debug Bridge，Android` 调试桥，身为 `Android` 开发的我们，熟练使用 `ADB` 命令将会大大提升我们的开发效率， `ADB` 的命令有很多，今天就来整理下我在开发常用到的一些 ADB 命令。

<!-- more -->

ADB 的安装这里就不多说了，输入以下命令有如下提示就证明你环境ok，否则自行网上搜索解决下。


## 基本用法

- `adb version` -- 查看版本

```sh
$ adb version

Android Debug Bridge version 1.0.36
Revision 8f855a3d9b35-android
```

- `adb [-d|-e|-s <serialNumber>] <command>` -- adb 命令的基本语法
如果有多个设备/模拟器连接，则需要为命令指定目标设备。

| 参数                  | 含义                                                   |
| :-------------------: | :----------------------------------------------------: |
| -d                    | 指定当前唯一通过 USB 连接的 Android 设备为命令目标     |
| -e                    | 指定当前唯一运行的模拟器为命令目标                     |
| -s <serialNumber>     | 指定相应 serialNumber 号的设备/模拟器为命令目标        |

在多个设备/模拟器连接的情况下较常用的是 -s <serialNumber> 参数，serialNumber 可以通过 adb devices 命令获取。如：

```sh
$ adb devices

List of devices attached
cf264b8f    device
emulator-5554   device

#输出里的cf264b8f 和 emulator-5554 即为 serialNumber。比如这时想指定 cf264b8f 这个设备来运行 adb 命令获取屏幕分辨率：

adb -s cf264b8f shell wm size
```

遇到多设备/模拟器的情况均使用这几个参数为命令指定目标设备，下文中为简化描述，不再重复。

- `adb start-server/adb kill-server`-- 启动/停止 Server

一般来说，这两个命令基本不会用到，因为只要设备连接正确，会自动启动 `adb server` 的，不过大家也需要知道这俩命令。

- `adb -P <port> start-server` -- 指定 adb server 的网络端口

## 设备连接

- `adb devices` -- 查看连接设备

```sh
eg:
adb devices

#通过USB:
List of devices attached
02ae0c1021089daf       device

#通过IP:(会有一个端口号,一般都是5555)
List of devices attached
192.168.123.104:5555    device
```

- `adb connect <device-ip-address>` -- 通过 IP 地址连接设备

```sh
eg:
adb connect 192.168.123.104
#会提示:
connected to 192.168.123.104:5555
```

- `adb disconnect <device-ip-address>` -- 断开无线连接

## 应用管理

- `adb install [-l\-r\-s\-d] <path_to_apk>` -- 安装应用

| 参数     | 含义                               |
| :------: | :--------------------------------: |
| -l       | 将应用安装到保护目录 /mnt/asec     |
| -r       | 允许覆盖安装允许覆盖安装           |
| -s       | 将应用安装到 sdcard                |
| -d       | 允许降级覆盖安装                   |

```sh
eg:
    adb install
    adb install /Users/storm/temp/demo.apk
    adb install -r demo.apk
    adb install -s demo.apk

#安装成功
[100%] /data/local/tmp/1.apk
    pkg: /data/local/tmp/1.apk
Success

#安装失败
[100%] /data/local/tmp/map-20160831.apk
        pkg: /data/local/tmp/map-20160831.apk
Failure [INSTALL_FAILED_ALREADY_EXISTS]

#adb install 内部原理简介

#adb install 实际是分三步完成：

#push apk 文件到 /data/local/tmp。

#调用 pm install 安装。

#删除 /data/local/tmp 下的对应 apk 文件。

#所以，必要的时候也可以根据这个步骤，手动分步执行安装过程。
```

- `adb uninstall [-k] <packagename>` -- 卸载应用

<packagename> 表示应用的包名，-k 参数可选，表示卸载应用但保留数据和缓存目录。

```sh
eg：
adb uninstall com.qihoo360.mobilesafe
#表示卸载 360 手机卫士。
```

- `adb shell pm clear <packagename>` -- 清除应用数据与缓存

<packagename> 表示应用名包，这条命令的效果相当于在设置里的应用信息界面点击了「清除缓存」和「清除数据」。

```sh
eg:
adb shell pm clear com.qihoo360.mobilesafe
#表示清除 360 手机卫士的数据和缓存。
```

- `adb shell pm list packages [-f/-d/-e/-s/-3/-i/-u] [FILTER]` -- 查看应用列表

| 参数         | 显示列表                     |
| :----------: | :--------------------------: |
| 无           | 所有应用                     |
| -f           | 显示应用关联的 apk 文件      |
| -d           | 只显示 disabled 的应用       |
| -e           | 只显示 enabled 的应用        |
| -s           | 只显示系统应用               |
| -3           | 只显示第三方应用             |
| [FILTER>]   | 包名包含 <FILTER> 字符串     |

```sh
eg:
    #系统应用
    adb shell pm list packages -s

    #第三方应用
    adb shell pm list packages -3

    #包名包含某字符串的应用
    adb shell pm list packages mazhuang

    #当然也可以使用 grep 来过滤：
    adb shell pm list packages | grep mazhuang
```

- `adb shell am force-stop <packagename>` -- 强制停止应用

```sh
eg:
adb shell am force-stop com.qihoo360.mobilesafe
#表示停止 360 安全卫士的一切进程与服务。
```

## 文件管理

- `adb pull <设备里的文件路径> [电脑上的目录]` -- 复制设备里的文件到电脑
其中 `电脑上的目录` 参数可以省略，默认复制到当前目录。
- `adb push <电脑上的文件路径> <设备里的目录>` -- 复制电脑里的文件到设备

## 模拟按键/输入

- `adb shell input keyevent <keycode>` -- 模拟按键/输入

| keycode     | 含义                               |
| :---------: | :--------------------------------: |
| 3           | HOME键                             |
| 4           | 返回键                             |
| 5           | 打开拨号应用                       |
| 6           | 挂断电话                           |
| 24          | 增加音量                           |
| 25          | 降低音量                           |
| 26          | 电源键                             |
| 27          | 拍照（需要在相机应用里）           |
| 64          | 打开浏览器                         |
| 82          | 菜单键                             |
| 85          | 播放/暂停                          |
| 86          | 停止播放                           |
| 87          | 播放下一首                         |
| 88          | 播放上一首                         |
| 122         | 移动光标到行首或列表顶部           |
| 123         | 移动光标到行末或列表底部           |
| 126         | 恢复播放                           |
| 127         | 暂停播放                           |
| 164         | 静音                               |
| 176         | 打开系统设置                       |
| 187         | 切换应用                           |
| 207         | 打开联系人                         |
| 208         | 打开日历                           |
| 209         | 打开音乐                           |
| 210         | 打开计算器                         |
| 220         | 降低屏幕亮度                       |
| 221         | 提高屏幕亮度                       |
| 223         | 系统休眠                           |
| 224         | 点亮屏幕                           |
| 231         | 打开语音助手                       |
| 276         | 如果没有 wakelock 则让系统休眠     |


```sh
eg:
#电源键
adb shell input keyevent 26

#菜单键
adb shell input keyevent 82

#HOME 键
adb shell input keyevent 3

#返回键
adb shell input keyevent 4

#音量加/减/静音
adb shell input keyevent 24/25/164

#滑动解锁(参数 300 1000 300 500 分别表示起始点x坐标 起始点y坐标 结束点x坐标 结束点y坐标)
adb shell input swipe 300 1000 300 500

#在焦点处于某文本框时，可以通过 input 命令来输入文本
adb shell input text hello
```
