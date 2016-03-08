var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var reactify = require('reactify');


gulp.task('js', function(){
    browserify('./components/main.jsx')
        .transform(reactify)
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest('public/javascripts/build/'));
});

gulp.task('watch', function() {
    gulp.watch("components/*.jsx", ["js"])
})

gulp.task('default', ['js', 'watch']);