'use strict';

const gulp = require('gulp'),
      rename = require('gulp-rename'),
      sass = require('gulp-sass'),
      typescript = require('gulp-typescript'),
      uglify = require('gulp-uglify');

gulp.task('minifyScripts', () => {
    return gulp.src('thumbnail-carousel.ts')
        .pipe(typescript())
        .pipe(uglify())
        .pipe(rename('thumbnail-carousel.min.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('compileSass', () => {
    return gulp.src('thumbnail-carousel.scss')
        .pipe(sass())
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', () => {
    gulp.watch('thumbnail-carousel.ts', ['minifyScripts']);
    gulp.watch('thumbnail-carousel.scss', ['compileSass']);
})

gulp.task('default', ['minifyScripts', 'compileSass', 'watch'], () => {
    console.log('done');
});