var gulp = require('gulp');
var sass = require('gulp-sass');
var gutil = require('gulp-util');
var browserify = require('browserify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');

var DEBUG = process.env.NODE_ENV === 'development';
var paths = {
  javascripts: './app/assets/javascripts/ui.js',
  stylesheets: './app/assets/stylesheets/*.scss'
};

function handleError(err) {
  gutil.beep();
  gutil.log(err.toString());
}

/**
 * UI application code
 */
function uiBuilder(packager) {
  var bundler = packager(paths.javascripts);

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

/**
 * UI CSS
 */
gulp.task('build-sass', function () {
  gulp.src(paths.stylesheets)
    .on('error', handleError)
    .pipe(sass({
      errLogToConsole: true,
      sourceMap: 'sass',
      sourceComments: 'map'
    }))
    .pipe(gulp.dest('./app/assets/stylesheets'));
});

gulp.task('watch-sass', function() {
  gulp.watch(paths.stylesheets, ['build-sass']);
});

gulp.task('build', ['build-ui', 'build-sass']);
gulp.task('watch', ['watch-ui', 'watch-sass']);