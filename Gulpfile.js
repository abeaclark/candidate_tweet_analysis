var gulp = require('gulp'),
    browserify = require('gulp-browserify');

gulp.task('scripts', function(){
  gulp.src(['main.js'])
    .pipe(browserify({
      debug: true,
      transform: ['reactify']
    }))
    .pipe(gulp.dest('./public/'));

});

gulp.task('default', ['scripts'])