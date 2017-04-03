//RUN
//  type npm run gulp on the command line to watch for scss changes

var gulp = require('gulp');
var sass = require('gulp-sass');

//CONVERTER
//  Converts scss into css
gulp.task('sass', function () {
  return gulp.src('./src/app/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./src/app/scss'));
});

//WATCHER
//  Watches for previous convertion
gulp.task('default', function () {
  gulp.watch('./src/app/scss/**/*.scss', ['sass']);
});
