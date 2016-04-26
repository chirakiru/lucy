var coffee = require('gulp-coffee');
var gulp   = require('gulp');
var gutil  = require('gulp-util');
var browserSync = require('browser-sync');
var reload = browserSync.reload

// Static server
gulp.task('watch', function() {
    browserSync({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch('./coffee/*.coffee', ['coffee'])
    gulp.watch('./js/*.js').on('change', reload)
});

gulp.task('coffee', function() {
  gulp.src('./coffee/*.coffee')
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(gulp.dest('./js/'));
});