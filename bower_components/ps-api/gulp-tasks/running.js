const gulp = require('gulp');
const browserSync = require('browser-sync').create();


gulp.task('copy',() =>
  gulp.src(["ps-*"])
  .pipe(gulp.dest("./bower_components/ps-api"))
);

gulp.task('serve',(done) => {

  browserSync.init({
    server: {
        baseDir: "./"
    }
  },done);

  gulp.watch("ps-*").on('change', gulp.series('copy', browserSync.reload));
  gulp.watch("demo/**").on('change', gulp.series(browserSync.reload));

});