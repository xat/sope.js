var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('minimize', function() {
    return gulp.src('sope.js')
        .pipe(uglify())
        .pipe(concat('sope.min.js'))
        .pipe(gulp.dest(''));
});

gulp.task('default', ['minimize']);