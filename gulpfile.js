'use strict'

const gulp = require('gulp');
const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');

const folder = {
  src: 'src/',
  dist: 'dist/'
}

gulp.task('scss', () => {
    gulp.src(folder.src + '/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cssnano({
            zindex: false
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(rename(function (path) {
            if(path.extname === '.css') {
                path.basename += '.min';
            }
        }))
        .pipe(gulp.dest(folder.dist + '/css/'))
});

//Watch task
gulp.task('default', function () {
  gulp.watch(folder.src + '/scss/**/*.scss', ['scss']);
});
