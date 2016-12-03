var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var uglify = require('gulp-uglify');
var browserify = require('gulp-browserify');
var autoprefixer = require('gulp-autoprefixer');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var merge = require('merge-stream');
var htmlmin = require('gulp-htmlmin');
var concat = require('gulp-concat');

var jsSources = [
  'js/jquery.js',
  'js/scripts.js'
];


gulp.task('sass', function() {
  var archivosSass,
      archivosCSS;

      archivosSass = gulp.src('scss/app.scss')
          .pipe(autoprefixer())
          .pipe(sass({
              includePaths: ['scss']
          }));

       archivosCSS = gulp.src('./node_modules/bootstrap/dist/css/bootstrap.css');

      return merge(archivosSass, archivosCSS)
        .pipe(concat('app.css'))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('app/css/'));
});

gulp.task('copiarFuentes', function() {
    gulp.src('./node_modules/bootstrap/dist/fonts/*.{eot,svg,ttf,woff,woff2}')
         .pipe(gulp.dest('app/fonts'));
});

gulp.task('js', function() {
  gulp.src(jsSources)
    .pipe(concat('scripts.js'))
    .pipe(browserify())
    .pipe(uglify())
    .pipe(gulp.dest('app/js'))
    .pipe(reload({stream:true}))
});

gulp.task('serve', ['sass'], function() {
  browserSync.init(["app/css/*.css", "app/js/*.js", "app/*.html"], {
    server: {
      baseDir: 'app'
    }
  });
});

gulp.task('minify', function() {
  return gulp.src('./*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('app'))
});


gulp.task('watch', ['sass', 'js', 'serve','copiarFuentes', 'minify'], function() {
  gulp.watch(["scss/*.scss"], ['sass']);
  gulp.watch(['js/*.js'], ['js']);
});


gulp.task('default', ['watch']);
