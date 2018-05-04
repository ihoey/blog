---
title: 博客评论网易云跟帖评论提醒功能
date: 2017-6-22 19:00:21
tags:
  - comment
categories: Linux
---

![comment_ihoey](https://cdn.dode.top/comment_ihoey.png)
多说官方宣布17年6月1号停止维护，一个优秀的评论系统从此倒下了，令人唏嘘不已，还是要感谢多说团队多年的付出。眼下留给博主们的选择也就畅言和网易云跟帖了。经过综合考虑选择了网易跟帖，由于网易云跟帖没有提醒功能，所以今天就做了一个邮件提醒的功能。

<!-- more -->

- 网易云跟帖的安装这里就不多说了，照着网上的教程走一遍或者按官方的文档基本上就可以了，不过提醒一下，网易云跟帖不能在本地测试，必须部署完成才会显示！

- 接下来才是本篇文章的重点。也是云跟帖不足的一个地方。之前多说收到评论会在博客的右上角提示，云跟帖就没有这个功能，而且也不会收到邮件，这样就不能即时的处理评论。好在提供了收到评论的回调功能，所以我们自己来实现发送邮件的功能。

## 数据回推

在获取代码里面有个优化设置功能，需要我们自己设置接口来接受评论推送。以下邮件评论提示由php来实现。php模拟邮箱登录发送邮件采用如下库：http://download.csdn.net/download/zhong960725/9755214
，亲测能正常使用，需要配置smtp服务区，端口，帐号和密码等。 网易通过结果返回的数据如下：

```json
[
  {
    "title" : "xxx",//文章标题
    "url" : "http://localhost/1.htm",//文章url
    "sourceId" : "xxx",//文章唯一id
    "ctime" : 11111,//文章创建时间
    "comments" : [{
        "cid" : "xxx",//跟贴id
        "content" : "xxxx",//内容
        "ctime" : 11111,//创建时间
        "pid" : "xxxx",//父贴id
        "ip" : "127.0.0.1",//发贴ip
        "source" : "web",//来源 app,web,wap
        "anonymous" : false,//是否匿名跟贴 false：非匿名 true：匿名
        "attachment" : {
          "type" : 0,//0没有附件 1为图片 2为语音 3为视频
          "desc" : "xxx",//描述
          "info" : "http://localhost/1.jpg"//附件地址
        },
        "user" : {
          "userId" : "xxx",//第三方用户id
          "nickname" : "xxx",//昵称
          "avatar" : "http://localhost/2.png"//头像地址
        }
      }
    ]
  }
]
```

## 服务器配置

- 搭建`web`服务器,博客前面有提到，可以[Linux常用命令笔记](https://blog.ihoey.com/posts/Linux/2017-05-26-liunx-shell.html)
- 搭建`PHP`环境,由于我的服务器是`Ubuntu 16.04`的,所以貌似不能安装`php5`了,所以这里是`php7`。
    + 安装`PHP` : `sudo apt-get install -y php7.0 php7.0-fpm php7.0-cli php7.0-common php7.0-mbstring php7.0-gd php7.0-intl php7.0-xml php7.0-mysql php7.0-mcrypt php7.0-zip`.
- 配置`nginx`,
```json
server {
        listen 80;
        server_name xxxx.xxx.xxx;

        root   /var/www/comment;
        index  index.php index.html index.htm;

        location ~ \.php$ {
                try_files $uri =404;
                fastcgi_split_path_info ^(.+\.php)(/.+)$;
                fastcgi_pass unix:/run/php/php7.0-fpm.sock;
                fastcgi_index index.php;
                fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
                include fastcgi_params;
    }
}
```

- 然后我这里将下载的`php`库文件放到`/var/www/comment`目录下。

## 代码实现

```php
<?php
header("Content-type: text/html; charset=utf-8");
date_default_timezone_set("Asia/Shanghai");

/**
 * Created by Ihoey
 * User: Ihoey
 * Date: 17/6/22
 * Time: 15:00
 */

$receiver = $_REQUEST;
if(count($receiver) > 0) {
    $content = implode(',', $receiver);
    $json = json_decode($content);
    if(isset($json) && count($json) > 0) {
        require_once("./functions.php");
        $title = $json[0]->title;
        $url = $json[0]->url;
        $ctime = $json[0]->ctime;
        $date = date('Y-m-d H:i:s', $ctime/1000);
        $name = $json[0]->comments[0]->user->nickname;
        $userId = $json[0]->comments[0]->user->userId;
        $comment = $json[0]->comments[0]->content;
        $flag = sendMail('123456.qq.com',"您的博客收到一条来自{$name}({$userId})的新评论",
            "文章标题:<br/><a target='_blank' href='{$url}'>{$title}</a><br/><br/>评论内容:<br/>{$name}({$userId}): {$comment}<br/><br/>评论时间:<br/>{$date}<br/><br/><br/>{$content}");
        file_put_contents('./comment.txt', $flag ? "success!" : "failure!");
    }
}
?>

/**
 * comment.php
 */
```

## 设置回推

优化设置里面的回推结果设置如下就好`http://yourDomain/comment.php`;

