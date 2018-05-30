const { resolveFromRootPath } = require('./helpers');

exports.paths = {
  ts: resolveFromRootPath('./src/**/*.ts'),
  specs: resolveFromRootPath('./src/**/*.spec.ts'),
  output: resolveFromRootPath('./public'),
  tslintConfig: resolveFromRootPath('./tslint.json'),
};
