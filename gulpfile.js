var gulp = require('gulp'),
    concat = require('gulp-concat'),
    usemin = require('gulp-usemin'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    del = require('del'),
    stylish = require('jshint-stylish'),
    uglify = require('gulp-uglify'),
    rev = require('gulp-rev');
    
    



gulp.task('jshint', function() {
    // return gulp.src('./scripts/**/*.js')
    //     .pipe(jshint())
    //     .pipe(jshint.reporter(stylish));
});

// Clean
gulp.task('clean', function() {
    return del(['dist']);
});


gulp.task('usemin', ['jshint'], function() {
    return gulp.src([
        'scripts/app.js',
        'components/**/*.js'
        ])
        .pipe(concat('rtr.min.js'))
        // .pipe(uglify())
        .pipe(gulp.dest('dist/'));
});


// Default task
gulp.task('default', ['clean'], function() {
    gulp.start('usemin');
});

