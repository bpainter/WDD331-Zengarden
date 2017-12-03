var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename');
var inlineSvg = require("gulp-inline-svg"),
    svgMin = require('gulp-svgmin');
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');

gulp.task('browser-sync', function() {
  browserSync({
    server: {
       baseDir: "./"
    }
  });
});

gulp.task('bs-reload', function () {
  browserSync.reload();
});

gulp.task('inline-svg', function() {
  return gulp.src("svg/**/*.svg")
      .pipe(svgMin())
      .pipe(inlineSvg())
      .pipe(gulp.dest("scss"));
});

gulp.task('styles', function(){
  gulp.src(['scss/**/*.scss'])
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(sass())
    .pipe(autoprefixer('last 2 versions'))
    .pipe(gulp.dest(''))
    .pipe(browserSync.reload({stream:true}))
});


gulp.task('default', ['browser-sync'], function(){
  gulp.watch("scss/**/*.scss", ['styles']);
  gulp.watch("*.html", ['bs-reload']);
});