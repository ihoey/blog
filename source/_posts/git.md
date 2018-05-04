---
title: Git 常用命令学习及整理
date: 2017-04-23 10:23:21
tags:
  - Git
categories: Git
---

最近用Git比较多，所以大概整理下 **Git是目前世界上最先进的分布式版本控制系统。**

<!--more-->

## 安装

安装软件就不多说了，这个肯定都会了
- 下载地址：<a class="active" href="https://git-scm.com/downloads" rel="nofollow">Downloads</a>

## 配置

```bash
git config --global user.name "ihoey"           # 设置git用户名
git config --global user.email "mail@ihoey.com" # 设置git邮箱
git config --global color.ui true               # 为true是终端着色
git config --global alias.co checkout           # 配置checkout的别名
git config --global alias.ci commit             # 配置commit的别名
git config --global alias.st status             # 配置status的别名
git config --global alias.br branch             # 配置branch的别名
git config --global core.editor "mate -w"       # 设置Editor使用textmate
git config -l                                   # 列举所有配置
#用户的git配置文件~/.gitconfig
```

## SSH 秘钥

```bash
ssh-keygen -t rsa -C "mail@ihoey.com"
# 连续3个回车。如果不需要密码的话。
# 最后得到了两个文件：id_rsa和id_rsa.pub，在~/.ssh/文件夹下面
# id_rsa为你的私钥，不可以告诉别人
# id_rsa.pub为你的公钥，一般会放在你的服务器做ssh登录，或者放在github上面
```


## GitHub 测试

```bash
ssh -T git@github.com
# 将公钥放在 github 测试是否验证通过命令，选择 yes 如果看到 Hi 后面是你的用户名，就说明成功了。
```

## 基本命令

- 创建`git`仓库 `git init`
- 添加文件到暂存区 `git add fileName` / `git add .`
- 提交文件到仓库 `git commit -m "版本提交信息"`
- 查看文件提交状态 `git status`
- 查看文件修改的信息 `git diff readme.txt `

```bash
git help <command>          # 显示command的help
git show                    # 显示某次提交的内容
git show $id

git checkout  -- <file>     # 抛弃工作区修改
git checkout  .             # 抛弃工作区修改

git add <file>              # 将工作文件修改提交到本地暂存区
git add .                   # 将所有修改过的工作文件提交暂存区

git rm <file>               # 从版本库中删除文件
git rm <file> --cached      # 从版本库中删除文件，但不删除文件

git reset <file>            # 从暂存区恢复到工作文件
git reset -- .              # 从暂存区恢复到工作文件
git reset --hard            # 恢复最近一次提交过的状态，即放弃上次提交后的所有本次修改

git commit -m "some comments"

git revert <$id>            # 恢复某次提交的状态，恢复动作本身也创建了一次提交对象
git revert HEAD             # 恢复最后一次提交的状态
```


## 查看文件

```bash
git diff <file>                 # 比较当前文件和暂存区文件差异
git diff
git diff <$id1> <$id2>          # 比较两次提交之间的差异
git diff <branch1>..<branch2>   # 在两个分支之间比较
git diff --staged               # 比较暂存区和版本库差异
git diff --cached               # 比较暂存区和版本库差异
git diff --stat                 # 仅仅比较统计信息
```

## 查看提交记录

```bash
git log
git log <file>      # 查看该文件每次提交记录
git log -p <file>   # 查看每次详细修改内容的diff
git log -p -2       # 查看最近两次详细修改内容的diff
git log --stat      # 查看提交统计信息
```

## 分支管理

```bash
git branch -r                           # 查看远程分支
git branch <new_branch>                 # 创建新的分支
git branch -v                           # 查看各个分支最后提交信息
git branch --merged                     # 查看已经被合并到当前分支的分支
git branch --no-merged                  # 查看尚未被合并到当前分支的分支

git checkout <branch>                   # 切换到某个分支
git checkout -b <new_branch>            # 创建新的分支，并且切换过去
git checkout -b <new_branch> <branch>   # 基于branch创建新的new_branch
git checkout $id                        # 把某次历史提交记录checkout出来，但无分支信息，切换到其他分支会自动删除
git checkout $id -b <new_branch>        # 把某次历史提交记录checkout出来，创建成一个分支
git branch -d <branch>                  # 删除某个分支
git branch -D <branch>                  # 强制删除某个分支 (未被合并的分支被删除的时候需要强制)
```

## 分支合并和rebase

```bash
git merge <branch>               # 将branch分支合并到当前分支
git merge --no-ff <branch>       # 不要Fast-Foward合并，这样可以生成merge提交
git rebase master <branch>       # 将master rebase到branch，相当于：
git checkout <branch> && git rebase master && git checkout master && git merge <branch>
```

- 在我们操作过程中。`merge `操作遇到冲突的时候，当前`merge`不能继续进行下去。手动修改冲突内容后，`add` 修改，`commit` 就可以了。
- 而`rebase` 操作的话，会中断`rebase`,同时会提示去解决冲突。解决冲突后,将修改`add`后执行`git rebase –continue`继续操作，或者`git rebase –skip`忽略冲突。

## Git暂存管理

```bash
git stash                        # 暂存
git stash list                   # 列所有stash
git stash apply                  # 恢复暂存的内容
git stash drop                   # 删除暂存区
```

## 远程分支管理

```bash
git pull                         # 抓取远程仓库所有分支更新并合并到本地
git pull --no-ff                 # 抓取远程仓库所有分支更新并合并到本地，不要快进合并
git fetch origin                 # 抓取远程仓库更新
git merge origin/master          # 将远程主分支合并到本地当前分支
git checkout --track origin/branch     # 跟踪某个远程分支创建相应的本地分支
git checkout -b <local_branch> origin/<remote_branch>  # 基于远程分支创建本地分支，功能同上
git push                         # push所有分支
git push origin master           # 将本地主分支推到远程主分支
git push -u origin master        # 将本地主分支推到远程(如无远程主分支则创建，用于初始化远程仓库)
git push origin <local_branch>   # 创建远程分支， origin是远程仓库名
git push origin <local_branch>:<remote_branch>  # 创建远程分支
git push origin :<remote_branch> #先删除本地分支(git br -d <branch>)，然后再push删除远程分支
```

## Git远程仓库管理

```bash
git remote -v                    # 查看远程服务器地址和仓库名称
git remote show origin           # 查看远程服务器仓库状态
git remote add origin git@github.com:ihoey/blog.git     # 添加远程仓库地址
git remote set-url origin git@github.com:ihoey/blog.git # 设置远程仓库地址(用于修改远程仓库地址)
git remote rm <repository>       # 删除远程仓库
```

## 创建远程仓库

```bash
git clone --bare ihoey.com blog.git     # 用带版本的项目创建纯版本仓库
scp -r my_blog.git git@ihoey.com:~      # 将纯仓库上传到服务器上
mkdir blog.git && cd blog.git && git --bare init # 在服务器创建纯仓库

git push -u origin master         # 客户端首次提交
git push -u origin develop        # 首次将本地develop分支提交到远程develop分支，并且track

git remote set-head origin master # 设置远程仓库的HEAD指向master分支
```

## 设置跟踪远程库和本地库

```bash
git branch --set-upstream master origin/master      #master
git branch --set-upstream develop origin/develop    #develop
```

## 其他命令

```bash
mkdir XX    #(创建一个空目录 XX指目录名)
pwd         #显示当前目录的路径。
cat XX      #查看XX文件内容
rm  XX      #删除文件
```
