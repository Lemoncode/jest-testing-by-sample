const gulp = require('gulp');
const ts = require('gulp-typescript');
const tsConfig = ts.createProject('../../tsconfig.json');
const sourcemaps = require('gulp-sourcemaps');
const rimraf = require('rimraf');
const tslint = require('gulp-tslint');
const { paths } = require('../constants');

gulp.task('build', [
  'clean',
  'ts',
]);

gulp.task('clean', (callback) => (
  rimraf(paths.output, callback)
));

gulp.task('ts', ['tslint'], () => (
  gulp.src([paths.ts, `!${paths.specs}`])
    .pipe(sourcemaps.init())
    .pipe(tsConfig())
    .js
    .pipe(sourcemaps.write('.', {
      includeContent: false,
      sourceRoot: '',
    }))
    .pipe(gulp.dest(paths.output))
));

gulp.task('tslint', () => (
  gulp.src(paths.ts)
    .pipe(tslint({
      configuration: paths.tslintConfig,
    }))
    .pipe(tslint.report({
      summarizeFailureOutput: true,
    }))
));
