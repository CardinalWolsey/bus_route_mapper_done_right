var gulp = require('gulp');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var appFiles = ['server.js', './lib/**/*.js', './public/js/**/*.js'];
var testFile = ['./test/**/*.js'];
var webpack = require('webpack-stream');
var minifyCss = require('gulp-minify-css');
var gulpWatch = require('gulp-watch');
var sass = require('gulp-sass');

gulp.task('jshint:test', function() {
  return gulp.src(testFile)
    .pipe(jshint({
      node: true,
      globals: {
        describe: true,
        it: true,
        before: true,
        after: true,
      }
    }))
    .pipe(jshint.reporter('default'));
});

gulp.task('jshint:app', function() {
  return gulp.src(appFiles)
    .pipe(jshint({
      node: true
    }))
    .pipe(jshint.reporter('default'));
});

gulp.task('mocha', function() {
    return gulp.src(testFile, {read: false})
      .pipe(mocha({reporter: 'default'}));
});

gulp.task('static:dev', function() {
  gulp.src('app/**/*.html')
    .pipe(gulp.dest('build/'));
});

gulp.task('webpack:dev', function() {
  gulp.src('app/js/entry.js')
    .pipe(webpack({
      output: {
        filename: 'bundle.js'
      }
    }))
    .pipe(gulp.dest('build/'));
});

gulp.task('sass:dev', function() {
  gulp.src('app/sass/application.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(minifyCss())
  .pipe(gulp.dest('build/'));
});

gulp.task('css:watch', function() {
  gulp.watch(['./app/css/**/*.scss', './app/index.html'], ['sass:dev', 'static:dev']);
});

gulp.task('build:dev', ['webpack:dev', 'static:dev', 'css:dev']);

gulp.task('jshint', ['jshint:test', 'jshint:app']);
gulp.task('default', ['jshint', 'mocha']);
