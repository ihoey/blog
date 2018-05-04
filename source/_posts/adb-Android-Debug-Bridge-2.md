---
title: adb设备信息查询修改刷机等命令
date: 2016-12-22 18:51:53
tags:
  - adb
  - Android
  - adb命令
categories: Android
---

ADB很强大，记住一些ADB命令有助于提高工作效率。
通过ADB命令查看wifi密码、MAC地址、设备信息、操作文件、查看文件、日志信息、卸载、启动和安装APK等

<!-- more -->

## 查看设备信息

- `adb logcat` -- 查看日志
- `adb shell dumpsys battery` -- 电池状况
其中 scale 代表最大电量，level 代表当前电量。上面的输出表示还剩下 44% 的电量
- `adb reboot` -- 重启
- `adb get-serialno` -- 获取序列号
- `adb shell  cat /sys/class/net/wlan0/address` -- MAC 地址
- `adb shell getprop ro.product.model` -- 型号
- `adb shell getprop ro.build.version.release` -- 查看 Android 系统版本
- `adb shell wm size` -- 查看屏幕分辨率
- `adb shell wm density` -- 查看屏幕密度
- `adb shell dumpsys window displays` -- 显示屏参数
- `adb shell settings get secure android_id` -- android_id
- `adb shell ifconfig | grep Mask` -- IP 地址(powershell无效)
- `adb shell cat /proc/cpuinfo` -- CPU 信息
- `adb shell cat /proc/meminfo` -- 内存信息(输出内容: `MemTotal` 总内存，`MemFree` 空闲内存)
- `adb shell cat /system/build.prop` -- 更多硬件与系统属性

| 属性名                              | 含义                         |
| :---------------------------------: | :--------------------------: |
| ro.build.version.sdk                | SDK 版本                     |
| ro.build.version.release            | Android 系统版本             |
| ro.build.version.security_patch     | Android 安全补丁程序级别     |
| ro.product.model                    | 型号                         |
| ro.product.brand                    | 品牌                         |
| ro.product.name                     | 设备名                       |
| ro.product.board                    | 处理器型号                   |
| ro.product.cpu.abilist              | CPU 支持的 abi 列表          |
| persist.sys.isUsbOtgEnabled         | 是否支持 OTG                 |
| dalvik.vm.heapsize                  | 每个应用程序的内存上限       |
| ro.sf.lcd_density                   | 屏幕密度                     |

## 修改设置

**注：**修改设置之后，运行恢复命令有可能显示仍然不太正常，可以运行 `adb reboot` 重启设备，或手动重启。

修改设置的原理主要是通过 settings 命令修改 /data/data/com.android.providers.settings/databases/settings.db 里存放的设置值。

### 分辨率

命令：

```sh
adb shell wm size 480x1024
```

表示将分辨率修改为 480px * 1024px。

恢复原分辨率命令：

```sh
adb shell wm size reset
```

### 屏幕密度

命令：

```sh
adb shell wm density 160
```

表示将屏幕密度修改为 160dpi。

恢复原屏幕密度命令：

```sh
adb shell wm density reset
```

### 显示区域

命令：

```sh
adb shell wm overscan 0,0,0,200
```

四个数字分别表示距离左、上、右、下边缘的留白像素，以上命令表示将屏幕底部 200px 留白。

恢复原显示区域命令：

```sh
adb shell wm overscan reset
```

### 关闭 USB 调试模式

命令：

```sh
adb shell settings put global adb_enabled 0
```

恢复：

用命令恢复不了了，毕竟关闭了 USB 调试 adb 就连接不上 Android 设备了。

去设备上手动恢复吧：「设置」-「开发者选项」-「Android 调试」。

### 状态栏和导航栏的显示隐藏

本节所说的相关设置对应 Cyanogenmod 里的「扩展桌面」。

命令：

```sh
adb shell settings put global policy_control <key-values>
```

`<key-values>` 可由如下几种键及其对应的值组成，格式为 `<key1>=<value1>:<key2>=<value2>`。

| key                       | 含义           |
| :-----------------------: | :------------: |
| immersive.full            | 同时隐藏       |
| immersive.status          | 隐藏状态栏     |
| immersive.navigation      | 隐藏导航栏     |
| immersive.preconfirms     | ?              |

这些键对应的值可则如下值用逗号组合：

| value              | 含义             |
| :----------------: | :--------------: |
| `apps`             | 所有应用         |
| `*`                | 所有界面         |
| `packagename`      | 指定应用         |
| `-packagename`     | 排除指定应用     |

例如：

```sh
adb shell settings put global policy_control immersive.full=*
```

表示设置在所有界面下都同时隐藏状态栏和导航栏。

```sh
adb shell settings put global policy_control immersive.status=com.package1,com.package2:immersive.navigation=apps,-com.package3
```

表示设置在包名为 `com.package1` 和 `com.package2` 的应用里隐藏状态栏，在除了包名为 `com.package3` 的所有应用里隐藏导航栏。

## 实用功能

### 屏幕截图

命令：

```sh
adb shell screencap -p /sdcard/sc.png
```

然后将 png 文件导出到电脑：

```sh
adb pull /sdcard/sc.png
```

可以使用 `adb shell screencap -h` 查看 `screencap` 命令的帮助信息，下面是两个有意义的参数及含义：

| 参数              | 含义                                           |
| :---------------: | :--------------------------------------------: |
| -p                | 指定保存文件为 png 格式                        |
| -d display-id     | 指定截图的显示屏编号（有多显示屏的情况下）     |

实测如果指定文件名以 `.png` 结尾时可以省略 -p 参数；否则需要使用 -p 参数。如果不指定文件名，截图文件的内容将直接输出到 stdout。

直接一行命令截图并保存到电脑的方法：

```sh
adb shell screencap -p | sed "s/\r$//" > sc.png
```

这个方法需要用到 sed 命令，在 Linux 和 Mac 下直接就有，在 Windows 下 Git 安装目录的 bin 文件夹下也有。如果确实找不到该命令，可以下载 [sed for Windows](http://gnuwin32.sourceforge.net/packages/sed.htm) 并将 sed.exe 所在文件夹添加到 PATH 环境变量里。

### 录制屏幕

录制屏幕以 mp4 格式保存到 /sdcard：

```sh
adb shell screenrecord /sdcard/filename.mp4
```

需要停止时按 <kbd>Ctrl-C</kbd>，默认录制时间和最长录制时间都是 180 秒。

如果需要导出到电脑：

```sh
adb pull /sdcard/filename.mp4
```

可以使用 `adb shell screenrecord --help` 查看 `screenrecord` 命令的帮助信息，下面是常见参数及含义：

| 参数                    | 含义                                                |
| :---------------------: | :-------------------------------------------------: |
| --size WIDTHxHEIGHT     | 视频的尺寸，比如 `1280x720`，默认是屏幕分辨率。     |
| --bit-rate RATE         | 视频的比特率，默认是 4Mbps。                        |
| --time-limit TIME       | 录制时长，单位秒。                                  |
| --verbose               | 输出更多信息。                                      |

### 重新挂载 system 分区为可写

**注：需要 root 权限。**

/system 分区默认挂载为只读，但有些操作比如给 Android 系统添加命令、删除自带应用等需要对 /system 进行写操作，所以需要重新挂载它为可读写。

步骤：

1. 进入 shell 并切换到 root 用户权限。

   命令：

   ```sh
   adb shell
   su
   ```

2. 查看当前分区挂载情况。

   命令：

   ```sh
   mount
   ```

   输出示例：

   ```sh
   rootfs / rootfs ro,relatime 0 0
   tmpfs /dev tmpfs rw,seclabel,nosuid,relatime,mode=755 0 0
   devpts /dev/pts devpts rw,seclabel,relatime,mode=600 0 0
   proc /proc proc rw,relatime 0 0
   sysfs /sys sysfs rw,seclabel,relatime 0 0
   selinuxfs /sys/fs/selinux selinuxfs rw,relatime 0 0
   debugfs /sys/kernel/debug debugfs rw,relatime 0 0
   none /var tmpfs rw,seclabel,relatime,mode=770,gid=1000 0 0
   none /acct cgroup rw,relatime,cpuacct 0 0
   none /sys/fs/cgroup tmpfs rw,seclabel,relatime,mode=750,gid=1000 0 0
   none /sys/fs/cgroup/memory cgroup rw,relatime,memory 0 0
   tmpfs /mnt/asec tmpfs rw,seclabel,relatime,mode=755,gid=1000 0 0
   tmpfs /mnt/obb tmpfs rw,seclabel,relatime,mode=755,gid=1000 0 0
   none /dev/memcg cgroup rw,relatime,memory 0 0
   none /dev/cpuctl cgroup rw,relatime,cpu 0 0
   none /sys/fs/cgroup tmpfs rw,seclabel,relatime,mode=750,gid=1000 0 0
   none /sys/fs/cgroup/memory cgroup rw,relatime,memory 0 0
   none /sys/fs/cgroup/freezer cgroup rw,relatime,freezer 0 0
   /dev/block/platform/msm_sdcc.1/by-name/system /system ext4 ro,seclabel,relatime,data=ordered 0 0
   /dev/block/platform/msm_sdcc.1/by-name/userdata /data ext4 rw,seclabel,nosuid,nodev,relatime,noauto_da_alloc,data=ordered 0 0
   /dev/block/platform/msm_sdcc.1/by-name/cache /cache ext4 rw,seclabel,nosuid,nodev,relatime,data=ordered 0 0
   /dev/block/platform/msm_sdcc.1/by-name/persist /persist ext4 rw,seclabel,nosuid,nodev,relatime,data=ordered 0 0
   /dev/block/platform/msm_sdcc.1/by-name/modem /firmware vfat ro,context=u:object_r:firmware_file:s0,relatime,uid=1000,gid=1000,fmask=0337,dmask=0227,codepage=cp437,iocharset=iso8859-1,shortname=lower,errors=remount-ro 0 0
   /dev/fuse /mnt/shell/emulated fuse rw,nosuid,nodev,relatime,user_id=1023,group_id=1023,default_permissions,allow_other 0 0
   /dev/fuse /mnt/shell/emulated/0 fuse rw,nosuid,nodev,relatime,user_id=1023,group_id=1023,default_permissions,allow_other 0 0
   ```

   找到其中我们关注的带 /system 的那一行：

   ```sh
   /dev/block/platform/msm_sdcc.1/by-name/system /system ext4 ro,seclabel,relatime,data=ordered 0 0
   ```

3. 重新挂载。

   命令：

   ```sh
   mount -o remount,rw -t yaffs2 /dev/block/platform/msm_sdcc.1/by-name/system /system
   ```

   这里的 `/dev/block/platform/msm_sdcc.1/by-name/system` 就是我们从上一步的输出里得到的文件路径。

如果输出没有提示错误的话，操作就成功了，可以对 /system 下的文件为所欲为了。

### 查看连接过的 WiFi 密码

**注：需要 root 权限。**

命令：

```sh
adb shell
su
cat /data/misc/wifi/*.conf
```

输出示例：

```sh
network={
    ssid="TP-LINK_9DFC"
    scan_ssid=1
    psk="123456789"
    key_mgmt=WPA-PSK
    group=CCMP TKIP
    auth_alg=OPEN
    sim_num=1
    priority=13893
}

network={
    ssid="TP-LINK_F11E"
    psk="987654321"
    key_mgmt=WPA-PSK
    sim_num=1
    priority=17293
}
```

`ssid` 即为我们在 WLAN 设置里看到的名称，`psk` 为密码，`key_mgmt` 为安全加密方式。

### 设置系统日期和时间

**注：需要 root 权限。**

命令：

```sh
adb shell
su
date -s 20160823.131500
```

表示将系统日期和时间更改为 2016 年 08 月 23 日 13 点 15 分 00 秒。

### 重启手机

命令：

```sh
adb reboot
```

### 检测设备是否已 root

命令：

```sh
adb shell
su
```

此时命令行提示符是 `$` 则表示没有 root 权限，是 `#` 则表示已 root。

### 使用 Monkey 进行压力测试

Monkey 可以生成伪随机用户事件来模拟单击、触摸、手势等操作，可以对正在开发中的程序进行随机压力测试。

简单用法：

```sh
adb shell monkey -p <packagename> -v 500
```

表示向 `<packagename>` 指定的应用程序发送 500 个伪随机事件。

Monkey 的详细用法参考 [官方文档](https://developer.android.com/studio/test/monkey.html)。

### 开启/关闭 WiFi

**注：需要 root 权限。**

有时需要控制设备的 WiFi 状态，可以用以下指令完成。

开启 WiFi：

```sh
adb root
adb shell svc wifi enable
```

关闭 WiFi：

```sh
adb root
adb shell svc wifi disable
```

若执行成功，输出为空；若未取得 root 权限执行此命令，将执行失败，输出 `Killed`。

## 刷机相关命令

### 重启到 Recovery 模式

命令：

```sh
adb reboot recovery
```

### 从 Recovery 重启到 Android

命令：

```sh
adb reboot
```

### 重启到 Fastboot 模式

命令：

```sh
adb reboot bootloader
```

### 通过 sideload 更新系统

如果我们下载了 Android 设备对应的系统更新包到电脑上，那么也可以通过 adb 来完成更新。

以 Recovery 模式下更新为例：

1. 重启到 Recovery 模式。

   命令：

   ```sh
   adb reboot recovery
   ```

2. 在设备的 Recovery 界面上操作进入 `Apply update`-`Apply from ADB`。

   注：不同的 Recovery 菜单可能与此有差异，有的是一级菜单就有 `Apply update from ADB`。

3. 通过 adb 上传和更新系统。

   命令：

   ```sh
   adb sideload <path-to-update.zip>
   ```

## 更多 adb shell 命令

Android 系统是基于 Linux 内核的，所以 Linux 里的很多命令在 Android 里也有相同或类似的实现，在 `adb shell` 里可以调用。本文档前面的部分内容已经用到了 `adb shell` 命令。

### 查看进程

命令：

```sh
adb shell ps
```

输出示例：

```sh
USER     PID   PPID  VSIZE  RSS     WCHAN    PC        NAME
root      1     0     8904   788   ffffffff 00000000 S /init
root      2     0     0      0     ffffffff 00000000 S kthreadd
...
u0_a71    7779  5926  1538748 48896 ffffffff 00000000 S com.sohu.inputmethod.sogou:classic
u0_a58    7963  5926  1561916 59568 ffffffff 00000000 S org.mazhuang.boottimemeasure
...
shell     8750  217   10640  740   00000000 b6f28340 R ps
```

各列含义：

| 列名     | 含义          |
| :------: | :-----------: |
| USER     | 所属用户      |
| PID      | 进程 ID       |
| PPID     | 父进程 ID     |
| NAME     | 进程名        |

### 查看实时资源占用情况

命令：

```sh
adb shell top
```

输出示例：

```sh
User 0%, System 6%, IOW 0%, IRQ 0%
User 3 + Nice 0 + Sys 21 + Idle 280 + IOW 0 + IRQ 0 + SIRQ 3 = 307

  PID PR CPU% S  #THR     VSS     RSS PCY UID      Name
 8763  0   3% R     1  10640K   1064K  fg shell    top
  131  0   3% S     1      0K      0K  fg root     dhd_dpc
 6144  0   0% S   115 1682004K 115916K  fg system   system_server
  132  0   0% S     1      0K      0K  fg root     dhd_rxf
 1731  0   0% S     6  20288K    788K  fg root     /system/bin/mpdecision
  217  0   0% S     6  18008K    356K  fg shell    /sbin/adbd
 ...
 7779  2   0% S    19 1538748K  48896K  bg u0_a71   com.sohu.inputmethod.sogou:classic
 7963  0   0% S    18 1561916K  59568K  fg u0_a58   org.mazhuang.boottimemeasure
 ...
```

各列含义：

| 列名     | 含义                                                           |
| :------: | :------------------------------------------------------------: |
| PID      | 进程 ID                                                        |
| PR       | 优先级                                                         |
| CPU%     | 当前瞬间占用 CPU 百分比                                        |
| S        | 进程状态（R=运行，S=睡眠，T=跟踪/停止，Z=僵尸进程）            |
| #THR     | 线程数                                                         |
| VSS      | Virtual Set Size 虚拟耗用内存（包含共享库占用的内存）          |
| RSS      | Resident Set Size 实际使用物理内存（包含共享库占用的内存）     |
| PCY      | 调度策略优先级，SP_BACKGROUND/SPFOREGROUND                     |
| UID      | 进程所有者的用户 ID                                            |
| NAME     | 进程名                                                         |

`top` 命令还支持一些命令行参数，详细用法如下：

```sh
Usage: top [ -m max_procs ] [ -n iterations ] [ -d delay ] [ -s sort_column ] [ -t ] [ -h ]
    -m num  最多显示多少个进程
    -n num  刷新多少次后退出
    -d num  刷新时间间隔（单位秒，默认值 5）
    -s col  按某列排序（可用 col 值：cpu, vss, rss, thr）
    -t      显示线程信息
    -h      显示帮助文档
```

### 其它

如下是其它常用命令的简单描述，前文已经专门讲过的命令不再额外说明：

| 命令      | 功能                            |
| :-------: | :-----------------------------: |
| cat       | 显示文件内容                    |
| cd        | 切换目录                        |
| chmod     | 改变文件的存取模式/访问权限     |
| df        | 查看磁盘空间使用情况            |
| grep      | 过滤输出                        |
| kill      | 杀死指定 PID 的进程             |
| ls        | 列举目录内容                    |
| mount     | 挂载目录的查看和管理            |
| mv        | 移动或重命名文件                |
| ps        | 查看正在运行的进程              |
| rm        | 删除文件                        |
| top       | 查看进程的资源占用情况          |

## 常见问题

### 启动 adb server 失败

**出错提示**

```sh
error: protocol fault (couldn\'t read status): No error
```


**可能原因**

adb server 进程想使用的 5037 端口被占用。

**解决方案**

找到占用 5037 端口的进程，然后终止它。以 Windows 下为例：

```sh
netstat -ano | findstr LISTENING

...
TCP    0.0.0.0:5037           0.0.0.0:0              LISTENING       1548
...
```

这里 1548 即为进程 ID，用命令结束该进程：

```sh
taskkill /PID 1548
```

然后再启动 adb 就没问题了。
