const path = require('path');
const gulp = require('gulp');
const ghPages  = require('gulp-gh-pages');
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

gulp.task('pages', function() {
  return gulp.src(["./index.html","./demo/*","./test/*", "./bower_components/**/*"],{base: '.'})
  .pipe(ghPages());
});

gulp.task('build', gulp.series('copy'));
gulp.task('pages-deployment', gulp.series('build', 'pages'));
gulp.task('default', gulp.series('build', 'serve'));