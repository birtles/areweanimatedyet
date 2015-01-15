var gulp = require('gulp'),
    gutil = require('gulp-util');

gulp.task('browserify', function() {
  var browserify = require('browserify'),
      reactify = require('reactify'),
      buffer = require('vinyl-buffer'),
      source = require('vinyl-source-stream'),
      transform = require('vinyl-transform'),
      uglify = require('gulp-uglify'),
      sourcemaps = require('gulp-sourcemaps'),
      concat = require('gulp-concat');

  return browserify('./src/main.jsx')
    .transform(reactify)
    .bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('areweanimatedyet.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
      // This is needed to work around a bug in uglify:
      // https://github.com/terinjokes/gulp-uglify/issues/56
      .pipe(concat('areweanimatedyet.js'))
      .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('.'))
    ;
});

gulp.task('default', ['browserify'], function() {
  console.log("Finished building.");
});
