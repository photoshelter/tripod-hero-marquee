const gulp = require('gulp');
const browserSync = require('browser-sync').create();


gulp.task('copy',() =>
  gulp.src(["ps-image-api*"])
  .pipe(gulp.dest("./bower_components/ps-image-api"))
);

gulp.task('serve',(done) => {

  browserSync.init({
    server: {
        baseDir: "./"
    }
  },done);

  gulp.watch("ps-image-api*").on('change', gulp.series('copy', browserSync.reload));
  gulp.watch("demo/**").on('change', gulp.series(browserSync.reload));

});