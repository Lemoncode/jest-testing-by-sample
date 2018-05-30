const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
require('./base');
const { paths } = require('../constants');

gulp.task('dev', [
  'watch',
  'start',
]);

const ouputMainFile = '../../public/app.js';
gulp.task('start', () => {
  nodemon({
    script: ouputMainFile,
  })
});

gulp.task('watch', () => (
  gulp.watch([paths.ts], ['ts'])
));
