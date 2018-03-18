var gulp = require('gulp');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();


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
