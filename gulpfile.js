var gulp = require('gulp'),
    source = require('vinyl-source-stream'),
    transform = require('vinyl-transform');

gulp.task('browserify', function() {
  var browserify = require('browserify'),
      reactify = require('reactify');

  return browserify('./src/main.jsx')
    .transform(reactify)
    .bundle()
    .pipe(source('areweanimatedyet.dev.js'))
    .pipe(gulp.dest('.'))
    ;
});

gulp.task('minify', ['browserify'], function() {
  var buffer = require('vinyl-buffer'),
      uglify = require('gulp-uglify'),
      sourcemaps = require('gulp-sourcemaps'),
      concat = require('gulp-concat');

  return gulp.src('areweanimatedyet.dev.js')
    .pipe(sourcemaps.init())
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
