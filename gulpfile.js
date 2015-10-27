var babel = require('gulp-babel');
var bower = require('bower');
var browserify = require('browserify');
var clean = require('gulp-rimraf');
var concat = require('gulp-concat');
var gulp = require('gulp');
var gutil = require('gulp-util');
var jade = require('gulp-jade');
var minifyCss = require('gulp-minify-css');
var minifyHtml = require('gulp-minify-html');
var minifyJs = require('gulp-uglify');
var process = require('process');
var rename = require('gulp-rename');
var runSequence = require('run-sequence');
var sass = require('gulp-sass');
var sh = require('shelljs');
var source = require('vinyl-source-stream');
var streamify = require('gulp-streamify');
var templateCache = require('gulp-angular-templatecache');

//==============================================================================
// * SETUP * ///////////////////////////////////////////////////////////////////
//==============================================================================

//-[ Build Env ]----------------------------------------------------------------

var isProduction = process.env.NODE_ENV === 'production' || !!gutil.env.production;
var isDesktop = !!gutil.env.desktop;

//-[ File Paths ]---------------------------------------------------------------

var paths = {
  fonts: ['./bower_components/ionic/fonts/*'],
  jade: [
    './src/**/*.jade',
    '!./src/templates/**/*.jade'
  ],
  images: ['./src/img/*'],
  ionicJs: ['./src/js/**/*.js'],
  electronJs: ['./src/main.js'],
  sass: ['./src/scss/**/*.scss'],
  templates: ['./src/templates/**/*.jade']
};

//==============================================================================
// * BUILD TASKS * /////////////////////////////////////////////////////////////
//==============================================================================

//-[ Default + Watch ]----------------------------------------------------------

gulp.task('default', ['clean-build']);

gulp.task('watch', function() {
  gulp.watch(paths.fonts, ['assets-fonts']);
  gulp.watch(paths.images, ['assets-images']);
  gulp.watch(paths.jade, ['assets-jade']);
  gulp.watch(paths.ionicJs, ['ionic-scripts']);
  gulp.watch(paths.templates, ['templates']);
  gulp.watch(paths.sass, ['styles']);
  if (isDesktop) {
    gulp.watch(paths.electronJs, ['electron-scripts']);
  }
});

//-[ Clean + Build ]------------------------------------------------------------

gulp.task('clean-build', function(done) {
  runSequence('clean', 'build', done);
});

gulp.task('clean', function() {
  return gulp.src(['./www', './src/js/templates.js'], { read: false })
    .pipe(clean());
});

gulp.task('build', ['build-parallel', 'build-sequential']);

gulp.task('build-parallel', function(done) {
  var parallel = ['assets', 'styles'];
  if (isDesktop) {
    parallel.push('electron-scripts');
  }
  runSequence(parallel, done);
});

gulp.task('build-sequential', function(done) {
  runSequence('templates', 'ionic-scripts', done);
});

//-[ Assets ]-------------------------------------------------------------------

gulp.task('assets', ['assets-fonts', 'assets-images', 'assets-jade']);

gulp.task('assets-fonts', function() {
  return gulp.src(paths.fonts).pipe(gulp.dest('www/fonts'));
});

gulp.task('assets-images', function() {
  return gulp.src(paths.images).pipe(gulp.dest('www/img'));
});

gulp.task('assets-jade', function(done) {
  return gulp.src(paths.jade)
    .pipe(jade({ pretty: true }))
    .pipe(isProduction ? minifyHtml({ empty: true }) : gutil.noop())
    .pipe(gulp.dest('./www'));
});

//-[ Templates ]----------------------------------------------------------------

gulp.task('templates', function(done) {
  return gulp.src(paths.templates)
    .pipe(jade({ pretty: true }))
    .pipe(isProduction ? minifyHtml({ empty: true }) : gutil.noop())
    .pipe(templateCache({
      filename: 'templates.js',
      module: 'templates',
      root: 'templates/',
      moduleSystem: 'es6',
      standalone: true
    }))
    .pipe(gulp.dest('./src/js'));
});

//-[ Scripts ]------------------------------------------------------------------

gulp.task('ionic-scripts', function(done) {
  return browserify('./src/js/app.js')
    .bundle()
    .pipe(source('app.bundle.js'))
    .pipe(isProduction ? streamify(minifyJs()) : gutil.noop())
    .pipe(gulp.dest('./www/js'));
});

gulp.task('electron-scripts', function() {
  return gulp.src('./src/main.js')
    .pipe(babel())
    .pipe(isProduction ? streamify(minifyJs()) : gutil.noop())
    .pipe(gulp.dest('./www'));
});

//-[ Styles ]-------------------------------------------------------------------

gulp.task('styles', function(done) {
  return gulp.src('./src/scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(isProduction ? minifyCss({ keepSpecialComments: 0 }) : gutil.noop())
    .pipe(gulp.dest('./www/css/'));
});

//==============================================================================
// * SYSTEM TASKS * ////////////////////////////////////////////////////////////
//==============================================================================

//-[ Installation + System Checks ]---------------------------------------------

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
