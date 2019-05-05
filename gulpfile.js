const {src, dest, series, watch} = require('gulp');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const cleanCSS = require('gulp-clean-css');
const rename = require("gulp-rename");
const browserSync = require('browser-sync').create();


/* Default task 

1) Run browser sync task. This watches sass files and runs the sass task once they are changed.


*/



/* Convert sass to css */

function convert(done){
    return src('./scss/**/*.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(dest('./css'))
        .pipe(browserSync.stream());
    done();
}


/* Browser Sync */

function liveReload(done){
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    watch("./**/*.html").on('change', browserSync.reload);
    watch("scss/**/*.scss", convert);
    done();
}

function minify(done){
    return src('css/*.css')
        .pipe(cleanCSS({
            compatibility: '*',
            level: '1'
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(dest('./css'));
    done();
}


/* Exports */
exports.convert = convert;
exports.liveReload = liveReload;
exports.minify = minify;

/* Default task */
exports.default = liveReload;