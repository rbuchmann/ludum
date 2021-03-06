'use strict';

var config = require('../config');
var gulp = require('gulp');

// Connect
gulp.task('connect', function () {
  var connect = require('connect');
  var app = connect()
    .use(require('connect-livereload')({ port: config.livereloadPort }))
    //.use('/', connect.static('app'))
    .use('/', connect.static('.tmp'))
    // paths to bower_components should be relative to the current file
    // e.g. in app/index.html you should use ../bower_components
    .use('/bower_components', connect.static('./app/bower_components'))
    .use('/assets', connect.static('./app/assets'))
    .use(connect.directory('app'));

  require('http').createServer(app)
    .listen(config.port)
    .on('listening', function () {
      console.log('Started connect web server on http://localhost:' + config.port);
    });
});

gulp.task('serve', ['connect', 'styles'], function () {
  require('opn')('http://localhost:' + config.port);
});
