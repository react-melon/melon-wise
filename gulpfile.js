/**
 * @file gulpfile
 * @author leon <ludafa@outlook.com>
 */

const gulp = require('gulp');
const babel = require('gulp-babel');
const clean = require('gulp-clean');
const babelOptions = require('./package.json').babelBuild || {};
const babelHelpers = require('gulp-babel-external-helpers');

gulp.task('babel', function () {
    return gulp.src('src/**/*.js')
        .pipe(babel(babelOptions))
        .pipe(babelHelpers('babelHelpers.js', 'umd'))
        .pipe(gulp.dest('dist'));
});

gulp.task('stylus', function () {
    return gulp.src('src/**/*.styl').pipe(gulp.dest('lib'));
});

gulp.task('build', ['babel', 'stylus']);

gulp.task('clean', function () {
    return gulp
        .src('lib', {read: false})
        .pipe(clean());
});

gulp.task('rebuild', ['clean', 'build']);

gulp.task('default', ['build']);
