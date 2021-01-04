var _exec = require("child_process").execSync;
require("shelljs/global");

// new 后自动打开编辑器
hexo.on("new", function (data) {
  console.log("code " + data.path);
  _exec("code " + data.path);
});

//监听 当 deploy 完成后执行备份
try {
  hexo.on("deployAfter", function () {
    //当deploy完成后执行备份
    deployServer();
    run();
  });
} catch (e) {
  console.log("产生了一个错误<(￣3￣)> !，错误详情为：" + e.toString());
}

function run() {
  if (!which("git")) {
    echo("对不起,这个脚本需要git");
    exit(1);
  } else {
    echo("======================自动备份开始===========================");
    console.log(__filename);
    if (exec("git add .").code !== 0) {
      echo("Error: Git add failed");
      exit(1);
    }
    if (exec('git commit -m "这个勤奋的家伙又更新源文件!"').code !== 0) {
      echo("Error: Git commit failed");
      exit(1);
    }
    if (exec("git pull origin hexo").code !== 0) {
      echo("Error: Git pull failed");
      exit(1);
    }
    if (exec("git push origin hexo").code !== 0) {
      echo("Error: Git push failed");
      exit(1);
    }
    echo("======================自动备份完成===========================");
  }
}

function deployServer() {
  _exec("scp -r ./public/* 360:/data/www/hexo/", { stdio: [0, 1, 2] });
  echo("部署服务器完成");
}
