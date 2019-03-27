# 01 Add config

In this sample we are going to add all the setup needed to support unit testing on this project with Jest.

We will start from sample _00 Boilerplate_.

Summary steps:
 - Install necessary libs.
 - Add testing npm scripts.
 - Adding Jest configuration.
 - Adding TypeScript configuration.
 - Adding sample unit test.
 - External jest config file.

# Steps to build it

- `npm install` to install previous sample packages:

```bash
npm install
```

Let's start by installing the testing libraries:

### Jest libs:

Jest [documentation page](https://facebook.github.io/jest/en/).

- [jest](https://github.com/facebook/jest): JavaScript Testing library with runner, assertion, mocks, etc.
- [@types/jest](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/df38f202a0185eadfb6012e47dd91f8975eb6151/types/jest): Typings for jest.
- [ts-jest](https://github.com/kulshekhar/ts-jest): A preprocessor with sourcemap support to help use Typescript with Jest.

> NOTE: We don't need `raf` polyfill due to we are not rendering components.

```bash
npm install jest @types/jest ts-jest -D
```

## Configuration

- Jest test commands:
  - `npm test`: to single run
  - `npm run test:watch`: to run all specs after changes.

NOTE:
> [Jest CLI options](https://facebook.github.io/jest/docs/en/cli.html#options)

> --watchAll To rerun all tests.

> --watch To rerun tests related to changed files.

> --verbose Display individual test results with the test suite hierarchy.

> -i or --runInBand Run all tests serially in the current process, rather than creating a worker pool of child processes that run tests. This can be useful for debugging

### ./package.json
```diff
{
  ...
  "scripts": {
    ...
-   "build": "gulp build --gulpfile config/gulp/base.js"
+   "build": "gulp build --gulpfile config/gulp/base.js",
+   "test": "jest --verbose",
+   "test:watch": "jest --watchAll --verbose -i"
  },
  ...
}
```

- [Jest configuration](https://facebook.github.io/jest/docs/en/configuration.html#options):

### ./package.json

```diff
{
    ...
- }
+ },
+ "jest": {
+  "testRegex": "\\.spec\\.ts$",
+   "moduleFileExtensions": [
+     "js",
+     "json",
+     "ts"
+   ]
+ }
```

- TypeScript configuration:

### ./package.json
```diff
{
  ...
  "jest": {
    "testRegex": "\\.spec\\.ts$",
    "moduleFileExtensions": [
      "js",
      "json",
      "ts"
-   ]
+   ],
+   "transform": {
+     ".ts": "<rootDir>/node_modules/ts-jest/preprocessor.js"
+   }
  }
}
```

- Finally we are going to automatically restore mock state between every test:

### ./package.json
```diff
{
  ...
   "jest": {
    "testRegex": "\\.spec\\.ts$",
    "moduleFileExtensions": [
      "js",
      "json",
      "ts"
    ],
    "transform": {
      ".ts": "<rootDir>/node_modules/ts-jest/preprocessor.js"
-   }
+   },
+   "restoreMocks": true
  }
}
```

## Adding sample spec

Let's launch tests in watch mode:

```bash
npm run test:watch
```

- Adding success spec:

### ./src/sample.spec.ts

```javascript
describe('Sample tests', () => {
  it('should pass spec', () => {
    // Arrange

    // Act

    // Assert
    expect(true).toBeTruthy();
  });
});
```

- Adding failed spec:

### ./src/sample.spec.ts

```diff
describe('Sample tests', () => {
  it('should pass spec', () => {
    // Arrange

    // Act

    // Assert
    expect(true).toBeTruthy();
  });

+ it('should fail spec', () => {
+   // Arrange

+   // Act

+   // Assert
+   expect(false).toBeTruthy();
+ });
});
```

## External jest config file

One step over, we could be moved jest config outside `package.json` to improve maintainability.

- Move config to `config/test/jest.json` file:

### ./package.json
```diff
...
- },
+ }
- "jest": {
-   "testRegex": "\\.spec\\.ts$",
-   "moduleFileExtensions": [
-     "js",
-     "json",
-     "ts"
-   ],
-   "transform": {
-     ".ts": "<rootDir>/node_modules/ts-jest/preprocessor.js"
-   },
-   "restoreMocks": true
- }
}
```

### ./config/test/jest.json
```json
{
  "testRegex": "\\.spec\\.ts$",
  "moduleFileExtensions": [
    "js",
    "json",
    "ts"
  ],
  "transform": {
    ".ts": "<rootDir>/node_modules/ts-jest/preprocessor.js"
  },
  "restoreMocks": true
}
```

- We only need a little detail to keep working with that Jest config

- Update `rootDir`:

### ./config/test/jest.json
```diff
{
+ "rootDir": "../../",
  "testRegex": "\\.spec\\.ts$",
  "moduleFileExtensions": [
    "js",
    "json",
    "ts"
  ],
  "transform": {
    ".ts": "<rootDir>/node_modules/ts-jest/preprocessor.js"
  },
  "restoreMocks": true
}
```

- And use that file:

### ./package.json
```diff
{
  ...
  "scripts": {
    ...
-   "test": "jest --verbose",
+   "test": "jest -c ./config/test/jest.json --verbose",
-   "test:watch": "jest --verbose --watchAll -i"
+   "test:watch": "jest -c ./config/test/jest.json --verbose --watchAll -i"
  },
  ...
}
```

- Running specs again:

```bash
npm run test:watch
```

# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
