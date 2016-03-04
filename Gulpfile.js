var gulp = require('gulp'),
    browserify = require('gulp-browserify'),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('scripts', function(){
  gulp.src(['./components/main.js'])
    .pipe(browserify({
      debug: true,
      transform: ['reactify']
    }))
    .pipe(gulp.dest('./public/javascripts/'));

});

gulp.task('styles', function(){
  gulp.src(['./custom.css'])
    .pipe(autoprefixer())
    .pipe(gulp.dest('./public/stylesheets/'));
});

gulp.task('watch', function() {
  gulp.watch('./public/stylesheets/custom.css', ['styles'])
});


gulp.task('default', ['scripts', 'styles'])