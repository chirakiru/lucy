var coffee  = require('gulp-coffee'),
    gulp    = require('gulp'),
    gutil   = require('gulp-util'),
stripDebug  = require('gulp-strip-debug'),
loadPollutant = require('./lib/loadPollutant.js'),
          $ = require('gulp-load-plugins')(),
browserSync = require('browser-sync'),
buildBlog   = require('./lib/LoadBlog.js'),
     reload = browserSync.reload;

// Static server
gulp.task('watch', function() {
    browserSync({
        server: {
            baseDir: "./src"
        }
    });

    gulp.watch('./src/coffee/*.coffee', ['coffee'])
    gulp.watch('./src/js/*.js').on('change', reload)
});

gulp.task('coffee', function() {
  gulp.src('./src/coffee/*.coffee')
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(gulp.dest('./src/js/'));
});

gulp.task('build', ['html', 'css', 'fonts', 'images', 'data', 'load-pollutant'], function() {
    gulp.start('compress');
})

gulp.task('compress', function() {
    gulp.src(['src/js/*.js'])
        .pipe(stripDebug())
        .pipe($.uglify())
        .pipe(gulp.dest('dist/js/'));
});

gulp.task('html', [], function() {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('dist'))
});

gulp.task('css', [], function() {
    return gulp.src('src/css/*.css')
        .pipe($.minifyCss())
        .pipe(gulp.dest('dist/css'))
});

gulp.task('fonts', [], function() {
    return gulp.src('src/fonts/*')
        .pipe(gulp.dest('dist/fonts'))
});

gulp.task('images', [], function() {
    return gulp.src('src/images/*')
        .pipe(gulp.dest('dist/images'))
});

gulp.task('data', [], function() {
    return gulp.src('src/data/*')
        .pipe(gulp.dest('dist/data'))
});

// Task for create pollutants pages
gulp.task('load-pollutant', function() {
    loadPollutant();
    return gulp.src('src/pollutants/*')
        .pipe(gulp.dest('dist/pollutants'))
});

// Task for create blog
gulp.task('load-blog', function() {
    buildBlog();
    return gulp.src('src/blog/*')
        .pipe(gulp.dest('dist/blog'))
});