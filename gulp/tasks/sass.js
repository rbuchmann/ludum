'use strict';

var config = require('../config');
var gulp = require('gulp');
// var prefix = require('gulp-autoprefixer');
var csso = require('gulp-csso');
var fingerprint = require('gulp-fingerprint');
var size = require('gulp-size');

// Styles
gulp.task('styles', function () {
  // See https://github.com/andrew/node-sass for more options
});

// Styles Dist
gulp.task('styles:dist', function () {
  var manifest = require('../../dist/image-manifest');
  // See https://github.com/andrew/node-sass for more options
});
