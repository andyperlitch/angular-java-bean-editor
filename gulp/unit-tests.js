'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')();

var merge = require('merge-stream');
var wiredep = require('wiredep');

var paths = gulp.paths;

function runTests (singleRun) {
  var bowerDeps = wiredep({
    directory: 'bower_components',
    exclude: ['bootstrap-sass-official'],
    dependencies: true,
    devDependencies: true
  });
  var testFiles = gulp.src(bowerDeps.js);
  var srcFiles = gulp.src([ 
    paths.src + '/{app,components}/**/*.js'
  ]).pipe($.angularFilesort());

  return merge(testFiles, srcFiles)
    .pipe($.karma({
      configFile: 'karma.conf.js',
      action: (singleRun)? 'run': 'watch'
    }))
}

gulp.task('test', runTests.bind(this, true));
gulp.task('test:auto', runTests.bind(this, false));
