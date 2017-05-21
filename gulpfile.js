/*
* @Author: henry
* @Date:   2017-05-21 21:06:13
* @Last Modified by:   henry
* @Last Modified time: 2017-05-21 21:37:21
*/

'use strict';

var gulp = require('gulp');
//html压缩
var htmlmin = require('gulp-html-minify');
//js压缩
var uglify = require('gulp-uglify');
//css压缩
var csso = require('gulp-csso');

var root = "./public";
var buildDir = root;
var datas={
    html:[root+"/**/*.html"],
    css:[root+"/**/*.css"],
    js:[root+"/**/*.js",'!*min.js']
}

// 压缩html
gulp.task("htmlmin",function(){
    gulp.src(datas.html)
    .pipe(htmlmin())
    .pipe(gulp.dest(buildDir));
});

// js压缩
gulp.task("jsmin",function(){
    gulp.src(datas.js)
    .pipe(uglify())
    .pipe(gulp.dest(buildDir));
});

// css压缩
gulp.task("cssmin",function(){
    gulp.src(datas.css)
    .pipe(csso())
    .pipe(gulp.dest(buildDir));
});

gulp.task("default",["htmlmin","jsmin","cssmin"]);
