# 00 Boilerplate

In this sample we are going to create a basic project structure with Node and Express.

Summary steps:

- Create `package.json`.
- Install `third party libraries`.
- Add `tsconfig` and `tslint` files.
- Add `gulp` configuration.
- Add `.env` file.
- Update `package.json` with npm scripts.
- Implementing basic app.

# Steps to build it

- We're going to start creating our `package.json`:

```bash
npm init
```

- First, we could install dev dependencies:

```bash
npm i @types/body-parser @types/express env-cmd gulp gulp-nodemon gulp-sourcemaps gulp-tslint gulp-typescript if-env rimraf tslint typescript -D
```

- Now prod dependencies:

```bash
npm i body-parser express -P
```

- Since, we are using TypeScript we need a `tsconfig.json` file:

### ./tsconfig.json

```json
{
  "compilerOptions": {
    "target": "es6",
    "module": "commonjs",
    "moduleResolution": "node",
    "declaration": false,
    "noImplicitAny": false,
    "sourceMap": true,
    "noLib": false,
    "outDir": "public"
  },
  "compileOnSave": false,
  "exclude": [
    "node_modules"
  ]
}
```

- And a `tslint.json` with code style rules:

### ./tslint.json

```json
{
  "extends": [
    "tslint:latest"
  ],
  "rules": {
    "class-name": true,
    "interface-name": false,
    "object-literal-sort-keys": false,
    "ordered-imports": [
      false
    ],
    "comment-format": [
      true,
      "check-space"
    ],
    "indent": [
      true,
      "spaces"
    ],
    "no-eval": true,
    "no-internal-module": true,
    "no-trailing-whitespace": true,
    "no-unsafe-finally": true,
    "no-var-keyword": true,
    "only-arrow-functions": [
      false
    ],
    "one-line": [
      true,
      "check-open-brace",
      "check-whitespace"
    ],
    "quotemark": [
      true,
      "single"
    ],
    "semicolon": [
      true,
      "always"
    ],
    "triple-equals": [
      true,
      "allow-null-check"
    ],
    "typedef-whitespace": [
      true,
      {
        "call-signature": "nospace",
        "index-signature": "nospace",
        "parameter": "nospace",
        "property-declaration": "nospace",
        "variable-declaration": "nospace"
      }
    ],
    "variable-name": [
      true,
      "ban-keywords"
    ],
    "whitespace": [
      true,
      "check-branch",
      "check-decl",
      "check-operator",
      "check-separator",
      "check-type"
    ],
    "no-var-requires": false,
    "no-empty": false,
    "member-ordering": false,
    "no-angle-bracket-type-assertion": false,
    "no-object-literal-type-assertion": false
  }
}
```

- Add `gulp` configuration:

### ./config/helpers.js

```javascript
const path = require('path');

const rootPath = path.resolve(__dirname, '..');

exports.resolveFromRootPath = (...args) => path.resolve(rootPath, ...args);
```

### ./config/contants.js

```javascript
const { resolveFromRootPath } = require('./helpers');

exports.paths = {
  ts: resolveFromRootPath('./src/**/*.ts'),
  specs: resolveFromRootPath('./src/**/*.spec.ts'),
  output: resolveFromRootPath('./public'),
  tslintConfig: resolveFromRootPath('./tslint.json'),
};
```

### ./config/gulp/base.js

```javascript
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
```

### ./config/gulp/dev.js

```javascript
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
```

- Add `.env` file:

### ./.env

```
NODE_ENV=development
PORT=8081
```

- Update `package.json` with npm scripts:

### ./package.json

```diff
...
  "scripts": {
-   "test": "echo \"Error: no test specified\" && exit 1"
+   "start": "env-cmd .env npm run start:env",
+   "start:env": "if-env NODE_ENV=production && npm run start:prod || npm run start:dev",
+   "start:dev": "npm run build && gulp dev --gulpfile config/gulp/dev.js",
+   "start:prod": "node public/app.js",
+   "build": "gulp build --gulpfile config/gulp/base.js"
  },
...
```

- If we need to use `process.env` in our app, we could create:

### ./src/env.ts

```javascript
export const env = {
  PORT: process.env.PORT,
};
```

- Add `src/app.ts` file:

### ./src/app.ts

```javascript
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { env } from './env';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(env.PORT);

// tslint:disable-next-line:no-console
console.log(`Running on port ${env.PORT}`);
```

- Finally we are going to add the `api/login` route to handle login requests:

### ./src/routers/login/controller.ts

```javascript
import { Request, Response } from 'express';

export const LoginController = () => ({
  post: (req: Request, res: Response) => {
    isValidLogin(req.body.login, req.body.password) ?
      res.sendStatus(201) :
      res.sendStatus(401);
  },
});

const isValidLogin = (login: string, password: string) => (
  login === 'admin' &&
  password === 'test'
);
```

### ./src/routers/login/router.ts

```javascript
import { Router } from 'express';
import { LoginController } from './controller';

export const loginRouter = () => {
  const router = Router();
  const controller = LoginController();
  router.route('/')
    .post(controller.post);

  return router;
};
```

### ./src/routers/login/index.ts

```javascript
export { loginRouter } from './router';
```

### ./src/routers/index.ts

```javascript
export { loginRouter } from './login';
```

- And use it in app.ts:

### ./src/app.ts

```diff
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { env } from './env';
+ import { loginRouter } from './routers';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

+ app.use('/api/login', loginRouter());
app.listen(env.PORT);

// tslint:disable-next-line:no-console
console.log(`Running on port ${env.PORT}`);
```

# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
