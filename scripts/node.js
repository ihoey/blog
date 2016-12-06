//new 后自动打开编辑器
var _exec = require('child_process').exec;

hexo.on('new', function(data){
// both ways work
//_exec('"D:\\Program Files\\Sublime Text 3\\sublime_text.exe" ' + data.path);
_exec('start "" "D:\\Program Files (x86)\\Microsoft VS Code\\Code.exe" ' + data.path);
});

//监听 当deploy完成后执行备份

require('shelljs/global');
try {
	hexo.on('deployAfter', function() {//当deploy完成后执行备份
		run();
	});
} catch (e) {
	console.log("产生了一个错误<(￣3￣)> !，错误详情为：" + e.toString());
}
function run() {
	if (!which('git')) {
		echo('对不起,这个脚本需要git');
		exit(1);
	} else {
		echo("======================自动备份开始===========================");
		cd('C:/Users/houyi/blog');    //此处修改为Hexo根目录路径
		if (exec('git add --all').code !== 0) {
			echo('Error: Git add failed');
			exit(1);
		}
		if (exec('git commit -m "更新源文件"').code !== 0) {
			echo('Error: Git commit failed');
			exit(1);
		}
		if (exec('git push origin hexo').code !== 0) {
			echo('Error: Git push failed');
			exit(1);
		}
		echo("======================自动备份完成===========================")
	}
}
