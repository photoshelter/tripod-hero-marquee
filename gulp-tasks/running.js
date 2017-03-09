const gulp = require('gulp');
const browserSync = require('browser-sync').create();

gulp.task('copy',() =>
  gulp.src('tripod-hero-marquee*')
  .pipe(gulp.dest('./bower_components/tripod-hero-marquee'))
);

gulp.task('serve',(done) => {

  browserSync.init({
    server: {
        baseDir: "./"
    },
	notify: false
  },done);

  gulp.watch("tripod-hero-marquee*").on("change", gulp.series('copy', browserSync.reload));
  gulp.watch("demo/**").on("change", gulp.series(browserSync.reload));
  gulp.watch("test/**").on("change", gulp.series(browserSync.reload));
  
});