var gulp   = require('gulp'),
    jshint = require('gulp-jshint');

gulp.task('hint', function() {
  gulp.src('./lib/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('default', ['hint']);
