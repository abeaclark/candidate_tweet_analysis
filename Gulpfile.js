var gulp = require('gulp'),
    browserify = require('gulp-browserify');

gulp.task('scripts', function(){
  gulp.src(['./components/*.js'])
    .pipe(browserify({
      debug: true,
      transform: ['reactify']
    }))
    .pipe(gulp.dest('./public/javascripts/'));

});

gulp.task('default', ['scripts'])