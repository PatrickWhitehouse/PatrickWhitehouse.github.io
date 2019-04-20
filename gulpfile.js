const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const cleanCSS = require('gulp-clean-css');
const rename = require("gulp-rename");
const browserSync = require('browser-sync').create();


/* Default task 

1) Run browser sync task. This watches sass files and runs the sass task once they are changed.


*/

gulp.task('default', ['browser-sync']);

/* Convert sass to css */

gulp.task('sass', function () {
    return gulp.src('./scss/**/*.scss')
      .pipe(plumber())
      .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('./css'))
      .pipe(browserSync.stream());
  });


/* browserSync */

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch("./**/*.html").on('change', browserSync.reload);
    gulp.watch("scss/**/*.scss", ['sass']);
});


/* Minify CSS */
gulp.task('minify-css', function() {
    return gulp.src('css/*.css')
        .pipe(cleanCSS({
            compatibility: '*',
            level: '1'
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./css'));
});