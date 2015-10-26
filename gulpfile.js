var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var streamify = require('gulp-streamify');
var jade = require('gulp-jade');
var templateCache = require('gulp-angular-templatecache');
var runSequence = require('run-sequence');
var clean = require('gulp-rimraf');
var uglify = require('gulp-uglify');

var isProduction = !!gutil.env.production;

var paths = {
  fonts: ['./bower_components/ionic/fonts/*'],
  jade: [
    './src/**/*.jade',
    '!./src/templates/**/*.jade'
  ],
  images: ['./src/img/*'],
  js: ['./src/**/*.js'],
  sass: ['./src/scss/**/*.scss'],
  templates: ['./src/templates/**/*.jade']
};

gulp.task('default', ['clean-build']);

gulp.task('clean-build', function(done) {
  runSequence('clean', 'build', done);
});

gulp.task('clean', function() {
  return gulp.src(['./www', './src/js/templates.js'], { read: false })
    .pipe(clean());
});

gulp.task('build', ['build-nonsequential', 'build-sequential']);
gulp.task('build-nonsequential', ['copy', 'jade', 'sass']);
gulp.task('build-sequential', function(done) {
  runSequence('templates', 'scripts', done);
});

gulp.task('copy', function() {
  gulp.src(paths.fonts).pipe(gulp.dest('www/fonts'));
  gulp.src(paths.images).pipe(gulp.dest('www/img'));
});

gulp.task('templates', function() {
  return gulp.src(paths.templates)
    .pipe(jade({ pretty: true }))
    .pipe(templateCache({
      filename: 'templates.js',
      module: 'templates',
      root: 'templates/',
      moduleSystem: 'es6',
      standalone: true
    }))
    .pipe(gulp.dest('./src/js'));
});

gulp.task('scripts', function() {
  return browserify('./src/js/app.js')
    .bundle()
    .pipe(source('app.js'))
    .pipe(isProduction ? streamify(uglify()) : gutil.noop())
    .pipe(gulp.dest('./www/js'));
});

gulp.task('jade', function() {
  return gulp.src(paths.jade)
    .pipe(jade({ pretty: true }))
    .pipe(gulp.dest('./www'));
});

gulp.task('sass', function(done) {
  gulp.src('./src/scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(isProduction ? minifyCss({ keepSpecialComments: 0 }) : gutil.noop())
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', function() {
  var assets = paths.fonts.concat(paths.images);
  gulp.watch(assets, ['copy']);
  gulp.watch(paths.jade, ['jade']);
  gulp.watch(paths.js, ['scripts']);
  gulp.watch(paths.templates, ['templates']);
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
