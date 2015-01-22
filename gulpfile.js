var gulp = require('gulp'),
    source = require('vinyl-source-stream'),
    transform = require('vinyl-transform');

gulp.task('jshint', function() {
  var jshint = require('gulp-jshint'),
      reactify = require('reactify'),
      packageJSON  = require('./package');

  return gulp.src('./src/*.jsx')
    .pipe(transform(reactify))
    .pipe(jshint(packageJSON['jshint-config']))
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('json-lint', function() {
  var jsonlint = require("gulp-jsonlint");

  gulp.src("./status.json")
      .pipe(jsonlint())
      .pipe(jsonlint.reporter());
});

gulp.task('lint', ['jshint', 'json-lint']);

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

gulp.task('watch', function() {
  var watcher = gulp.watch('src/**/*.js?(x)', ['lint', 'minify']);
  watcher.on('change', function(event) {
    console.log('File ' + event.path + ' was ' + event.type
                + ', building...');
  });

  var jsonWatcher = gulp.watch('*.json', ['json-lint']);
  jsonWatcher.on('change', function(event) {
    console.log('File ' + event.path + ' was ' + event.type
                + ', linting...');
  });
});

gulp.task('deploy', function() {
  var deploy = require('gulp-gh-pages');

  console.log(process.env.TRAVIS_REPO_SLUG);
  console.log(process.env.GH_TOKEN ? "GH_TOKEN is set" : "GH_TOKEN not set!");
  var repo = process.env.GH_TOKEN && process.env.TRAVIS_REPO_SLUG
           ? 'https://' + process.env.GH_TOKEN + '@github.com/'
               + process.env.TRAVIS_REPO_SLUG + '.git'
           : undefined;
  console.log("repo.length: " + repo.length);

  return gulp.src(
    [ 'index.html',
      'areweanimatedyet.*',
      'status.json',
      'humans.txt',
      'README.md',
      './img/**/*',
      './css/**/*'
    ], {base: "."})
    .pipe(deploy({
      origin: repo,
      message: process.env.COMMIT_MESSAGE || undefined
    }));
});

gulp.task('default', ['lint', 'minify'], function() {
  console.log("Finished building.");
});
