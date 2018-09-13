// require plugins
const gulp = require('gulp');
const sass = require('gulp-sass');
const bulkSass = require('gulp-sass-bulk-import');
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');
const pleeease = require('gulp-pleeease');
const notify = require('gulp-notify');
const postcss = require('gulp-postcss');
const cssDeclarationSorter = require('css-declaration-sorter');
const mqpacker = require('css-mqpacker');
const cssnano = require('cssnano');

// project name
const project = 'my-project';

// Sass Task Settings
gulp.task('sass', () => {
  const plugin = [
    cssDeclarationSorter({
      order: 'smacss',
    }),
    mqpacker(),
    cssnano({ autoprefixer: false }),
  ];

  return gulp.src('src/scss/**/*.scss')
    .pipe(bulkSass())
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>'),
    }))
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'compressed',
      // errLogToConsole: true,
    // includePaths: [ 'src/' ],
    }))
    .pipe(postcss(plugin))
    .pipe(pleeease({
      "autoprefixer": false,
    })) // commpress & add prefix & sourcemap
    .pipe(sourcemaps.write()) // リリース時にはsourcemapsを外す
    .pipe(gulp.dest(`build/${project}/assets/css`))
    .pipe(notify('css task finished'));
});

// Copy
gulp.task('copy', () => {
  gulp.src('static/**/*')
    .pipe(gulp.dest(`build/${project}`));
});

// Gulp Watch Settings
gulp.task('default', () => {
  gulp.watch("src/scss/**/*.scss",["sass"]); //run sass
  gulp.watch('static/**/*', ['copy']);
});
