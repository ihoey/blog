/*
 * @Author: henry
 * @Date:   2017-05-21 21:06:13
 * @Last Modified by:   henry
 * @Last Modified time: 2017-05-22 20:54:19
 */

'use strict';

var gulp = require('gulp');
//html压缩
var beautify = require('gulp-html-beautify');
//js压缩
var uglify = require('gulp-uglify');
//css压缩
var csso = require('gulp-csso');

var root = "./public";
var buildDir = root;
var datas = {
    html: [root + "/**/*.html"],
    css: [root + "/**/*.css"],
    js: [root + "/**/*.js", '!*min.js']
}

// 压缩html
gulp.task('beautify', function() {
    var options = {
        indentSize: 4,
        "indent_char": " ",
        "eol": "\n",
        "indent_level": 0,
        "indent_with_tabs": false,
        "preserve_newlines": true,
        "max_preserve_newlines": 10,
        "jslint_happy": false,
        "space_after_anon_function": false,
        "brace_style": "collapse",
        "keep_array_indentation": false,
        "keep_function_indentation": false,
        "space_before_conditional": true,
        "break_chained_methods": false,
        "eval_code": false,
        "unescape_strings": false,
        "wrap_line_length": 0,
        "wrap_attributes": "auto",
        "wrap_attributes_indent_size": 4,
        "end_with_newline": false
    };
    gulp.src(datas.html)
        .pipe(beautify(options))
        .pipe(gulp.dest(buildDir))
});

// js压缩
gulp.task("jsmin", function() {
    gulp.src(datas.js)
        .pipe(uglify())
        .pipe(gulp.dest(buildDir));
});

// css压缩
gulp.task("cssmin", function() {
    gulp.src(datas.css)
        .pipe(csso())
        .pipe(gulp.dest(buildDir));
});

gulp.task("default", ["beautify", "jsmin", "cssmin"]);
