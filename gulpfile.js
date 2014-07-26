var gulp = require('gulp');
var gutil = require('gulp-util');
var browserify = require('browserify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');

var DEBUG = process.env.NODE_ENV === 'development';

function handleError(err) {
  gutil.beep();
  gutil.log(err.toString());
}

/**
 * UI application code
 */
function uiBuilder(packager) {
  var bundler = packager('./app/assets/javascripts/ui.js');

  function rebundle(files) {
    bundler
      .bundle({ debug:DEBUG, verbose:true })
      .on('error', handleError)
      .pipe(source('ui-bundle.js'))
      .pipe(gulp.dest('./app/assets/javascripts'));
  }

  bundler
    .transform('reactify')
    .on('update', rebundle)
    .on('log', gutil.log);

  return rebundle();
}

gulp.task('build-ui', function() {
  uiBuilder(browserify);
});

gulp.task('watch-ui', function() {
  uiBuilder(watchify);
});

gulp.task('build', ['build-ui']);
gulp.task('watch', ['watch-ui']);