const path = require('path');
const gulp = require('gulp');
const babel = require('gulp-babel');
const flatten = require('gulp-flatten');
const minify = require('gulp-minify');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();

gulp.task('transpile', () =>
  gulp.src('src/*.js')
  .pipe(babel({
    presets: ['es2015-node5']
  }))
  .pipe(flatten())
  //.pipe(minify())
  //.pipe(uglify())
  .pipe(gulp.dest('./'))
  .pipe(gulp.dest('./bower_components/action-hero'))
);

gulp.task('copy',() =>
  gulp.src('src/*.html')
  .pipe(gulp.dest('./'))
  .pipe(gulp.dest('./bower_components/action-hero'))
);

gulp.task('serve',(done) => {

  browserSync.init({
    server: {
        baseDir: "./"
    },
	notify: false
  },done);


  gulp.watch("src/**").on("change", gulp.series('transpile', 'copy', browserSync.reload));
});

gulp.task('build', gulp.series('transpile', 'copy'));
gulp.task('default', gulp.series('build', 'serve'));


// // If you remove this you can remove these deps from the package.json
// var wct = require('web-component-tester');
// var gutil = require('gulp-util');
// gulp.task('test-without-safari', function(done) {
//   wct.test({
//     plugins: {local: ['chrome', 'firefox'], sauce: false}
//   }, function(err) {
//     if (err) {
//       err = new gutil.PluginError('wct', err, {showStack: true});
//     }
//     done(err);
//   });
// });
