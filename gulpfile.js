import gulp from 'gulp';
import { deleteAsync } from 'del';
import eslint from 'gulp-eslint-new';
import terser from 'gulp-terser';
import cleanCss from 'gulp-clean-css';
import htmlmin from 'gulp-htmlmin';
import imagemin from 'gulp-imagemin';
import cache from 'gulp-cache';
import zip from 'gulp-zip';

export function clean() {
  return deleteAsync(['dist', 'dist.zip']);
}

function lint() {
  return gulp
    .src(['src/scripts/**/*.js'])
    .pipe(eslint({ fix: true }))
    .pipe(eslint.fix())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(gulp.dest('src/scripts'));
}

function scripts() {
  return gulp
    .src('src/scripts/**/*.js')
    .pipe(terser())
    .pipe(gulp.dest('dist/scripts'));
}

function styles() {
  return gulp
    .src('src/styles/**/*.css')
    .pipe(cleanCss())
    .pipe(gulp.dest('dist/styles'));
}

function html() {
  return gulp
    .src('src/*.html')
    .pipe(
      htmlmin({
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: { compress: { drop_console: true } },
        processConditionalComments: true,
        removeComments: true,
        removeEmptyAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
      }),
    )
    .pipe(gulp.dest('dist'));
}

function images() {
  return gulp
    .src('src/images/**/*', { encoding: false })
    .pipe(cache(imagemin()))
    .pipe(gulp.dest('dist/images'));
}

// function fonts() {
//   return gulp.src('src/fonts/**/*').pipe(gulp.dest('dist/fonts'));
// }

function extras() {
  return gulp
    .src(
      [
        'src/**',
        '!src/scripts/**',
        '!src/styles/**',
        '!src/*.html',
        '!src/images/**',
      ],
      {
        dot: true,
      },
    )
    .pipe(gulp.dest('dist'));
}

function compress() {
  return gulp.src('dist/*').pipe(zip('dist.zip')).pipe(gulp.dest('.'));
}

export const build = gulp.parallel(
  gulp.series(lint, scripts),
  styles,
  html,
  images,
  // fonts,
  extras,
);

export default gulp.series(clean, build, compress);
