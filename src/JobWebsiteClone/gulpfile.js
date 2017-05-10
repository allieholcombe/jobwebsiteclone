﻿/// <binding BeforeBuild='clean' AfterBuild='sass, min' Clean='clean' ProjectOpened='watch-sass' />
"use strict";

var gulp = require("gulp"),
  rimraf = require("rimraf"),
  concat = require("gulp-concat"),
  cssmin = require("gulp-cssmin"),
  uglify = require("gulp-uglify"),
    sass = require("gulp-sass"),
    gutil = require('gulp-util');

var paths = {
    webroot: "./wwwroot/"
};

paths.js = paths.webroot + "lib/**/*.js";
paths.minJs = paths.webroot + "lib/**/*.min.js";
paths.css = paths.webroot + "lib/**/*.css";
paths.minCss = paths.webroot + "lib/**/*.min.css";
paths.concatJsDest = paths.webroot + "js/site.min.js";
paths.concatCssDest = paths.webroot + "css/site.min.css";
paths.scss = "Styles/scss/**/*.scss";

gulp.task("clean:js", function (cb) {
    rimraf(paths.concatJsDest, cb);
});

gulp.task("clean:css", function (cb) {
    rimraf(paths.concatCssDest, cb);
});

gulp.task("sass", function () {
    return gulp.src(paths.scss)
      .pipe(sass())
      .pipe(gulp.dest('wwwroot/css'));
});

gulp.task('watch-sass', function () {
    gulp.watch(paths.scss, ['sass']);
})

gulp.task("clean", ["clean:js", "clean:css"]);

gulp.task("min:js", function () {
    return gulp.src([paths.js, "!" + paths.minJs], { base: "." })
      .pipe(concat(paths.concatJsDest))
      .pipe(uglify().on('error', gutil.log))
      .pipe(gulp.dest("."));
});

gulp.task("min:css", function () {
    return gulp.src([paths.css, "!" + paths.minCss])
      .pipe(concat(paths.concatCssDest))
      .pipe(cssmin())
      .pipe(gulp.dest("."));
});

gulp.task("min", ["min:js", "min:css"]);

//gulp.task('min:js', function () {
//    return gulp.src(['dev_assets/scripts/*.js'])
//      .pipe(concat('all.min.js'))
//      .pipe(uglify())
//      .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
//      .pipe(gulp.dest('public/js'));
//})
