var gulp = require('gulp');
var concatCss = require('gulp-concat-css');
let cleanCSS = require('gulp-clean-css');
var uncss = require('gulp-uncss-sp');
const autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
var cssnano = require('gulp-cssnano');
var url = 'med24'

function styles(){
   return gulp.src('./src/scss/**/*.scss')
    
   .pipe(sourcemaps.init())
.pipe(sass().on('error', sass.logError))
//.pipe(uncss({ html: ['index.html']  }))
.pipe(autoprefixer())
.pipe(cleanCSS())
//.pipe(cssnano())
.pipe(sourcemaps.write())
.pipe(gulp.dest('./build/css/'))
     .pipe(browserSync.stream())
}

function scripts(){
	    return gulp.src('./src/js/*.js')
   .pipe(concat('all.js'))
  //   .pipe(uglify({
  //   	toplevel: true
		// }))
    .pipe(gulp.dest('./build/js/'))
    .pipe(browserSync.stream())
}
function watch(){
browserSync.init({
	proxy: url
	});
	gulp.watch('./src/scss/**/*.scss', styles);
	gulp.watch('./src/js/**/*.js', scripts);
	gulp.watch('./**/*.html').on('change',browserSync.reload);
  gulp.watch('./**/*.php').on('change',browserSync.reload);
}

gulp.task('styles', styles);
gulp.task('scripts', scripts);
gulp.task('watch', watch);
gulp.task('build',gulp.series(gulp.parallel(styles,scripts)))
gulp.task('default', gulp.series('build','watch'));
