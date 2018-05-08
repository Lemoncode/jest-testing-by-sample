# 01 Add config

In this sample we are going to add all the setup needed to support unit testing on this project with Jest.

We will start from sample _00 Boilerplate_.

Summary steps:
 - Installing Jest libs.
 - Installing Render React components libs.
 - Installing other useful libs.
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
- [raf](https://github.com/chrisdickinson/raf): `requestAnimationFrame` polyfill for node and browser. Needed for React >= 16

```bash
npm install jest @types/jest ts-jest raf -D

```

### Render React component libs:

We have two options for render components: `react-test-renderer` or `enzyme`.

- [react-test-renderer](https://www.npmjs.com/package/react-test-renderer): provides an experimental React renderer that can be used to render React components to pure JavaScript objects, without depending on the DOM or a native mobile environment.
  - Pros: no necessary other library to snapshot testing
  - Cons: hard to test DOM events or other manipulation.
  - [Sample](https://facebook.github.io/jest/docs/en/snapshot-testing.html#snapshot-testing-with-jest)

- [enzyme](https://github.com/airbnb/enzyme): Testing utility for React that makes it easier to work with DOM.
  - Pros: intuitive API for DOM manipulation.
  - Cons: it needs to install other libraries to snapshot testing.

- [@types/enzyme](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/enzyme): Typings for enzyme.
- [enzyme-to-json](https://github.com/adriantoine/enzyme-to-json): Convert enzyme wrappers to snapshot testing.
- [enzyme-adapter-react-16](https://github.com/airbnb/enzyme/tree/master/packages/enzyme-adapter-react-16): Enzyme adapter for React 16.

```bash
npm install enzyme @types/enzyme enzyme-to-json enzyme-adapter-react-16 -D

```

### Other useful libraries

- [deep-freeze](https://github.com/substack/deep-freeze): To ensure immutability of the reducers.
- [@types/deep-freeze](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/df38f202a0185eadfb6012e47dd91f8975eb6151/types/deep-freeze): Typings for deep-freeze.
- [redux-mock-store](https://github.com/arnaudbenard/redux-mock-store): A mock store for testing your redux async action creators and middleware.
- [@types/redux-mock-store](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/df38f202a0185eadfb6012e47dd91f8975eb6151/types/redux-mock-store): Typings for redux-mock-store.
- [identity-obj-proxy](https://github.com/keyanzhang/identity-obj-proxy): For testing components using CSS Modules.

```bash
npm install deep-freeze @types/deep-freeze @types/redux-mock-store identity-obj-proxy -D

```

- Save exact version due to [breaking changes in 1.5 version](https://github.com/arnaudbenard/redux-mock-store/issues/135)
```bash
npm install redux-mock-store@1.4 -D -E

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
-   "build:prod": "rimraf dist && env-cmd .env cross-env NODE_ENV=production webpack -p --config ./config/webpack/app/prod.js"
+   "build:prod": "rimraf dist && env-cmd .env cross-env NODE_ENV=production webpack -p --config ./config/webpack/app/prod.js",
+   "test": "jest --verbose",
+   "test:watch": "jest --verbose --watchAll -i"
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
+   "testRegex": "\\.spec\\.tsx?$",
+   "moduleFileExtensions": [
+     "js",
+     "jsx",
+     "json",
+     "ts",
+     "tsx"
+   ]
}

```

- Set up polyfills _config/test/polyfills.js and add `raf`:

### config/test/polyfills.js

```js
// Polyfill requestAnimationFrame required by React >=16.0.0
require('raf/polyfill');

```

### ./package.json

```diff
{
  ...
  "jest": {
    "testRegex": "\\.spec\\.tsx?$",
    "moduleFileExtensions": [
      "js",
      "jsx",
      "json",
      "ts",
      "tsx"
-   ]
+   ],
+   "setupFiles": [
+     "<rootDir>/config/test/polyfills.js"
+   ]
}

```

- TypeScript configuration:

### ./package.json
```diff
{
  ...
  "jest": {
    "testRegex": "\\.spec\\.tsx?$",
    "moduleFileExtensions": [
      "js",
      "jsx",
      "json",
      "ts",
      "tsx"
    ],
    "setupFiles": [
      "<rootDir>/config/test/polyfills.js"
-   ]
+   ],
+   "transform": {
+     ".tsx?": "<rootDir>/node_modules/ts-jest/preprocessor.js"
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
    "testRegex": "\\.spec\\.tsx?$",
    "moduleFileExtensions": [
      "js",
      "jsx",
      "json",
      "ts",
      "tsx"
    ],
    "setupFiles": [
      "<rootDir>/config/test/polyfills.js"
    ],
    "transform": {
      ".tsx?": "<rootDir>/node_modules/ts-jest/preprocessor.js"
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
-   "testRegex": "\\.spec\\.tsx?$",
-   "moduleFileExtensions": [
-     "js",
-     "jsx",
-     "json",
-     "ts",
-     "tsx"
-   ],
-   "setupFiles": [
-     "<rootDir>/config/test/polyfills.js"
-   ],
-   "transform": {
-      ".tsx?": "<rootDir>/node_modules/ts-jest/preprocessor.js"
-   },
-   "restoreMocks": true
- }
}

```

### ./config/test/jest.json
```json
{
  "testRegex": "\\.spec\\.tsx?$",
  "moduleFileExtensions": [
    "js",
    "jsx",
    "json",
    "ts",
    "tsx"
  ],
  "setupFiles": [
    "<rootDir>/config/test/polyfills.js"
  ],
  "transform": {
    ".tsx?": "<rootDir>/node_modules/ts-jest/preprocessor.js"
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
  "testRegex": "\\.spec\\.tsx?$",
  "moduleFileExtensions": [
    "js",
    "jsx",
    "json",
    "ts",
    "tsx"
  ],
  "setupFiles": [
    "<rootDir>/config/test/polyfills.js"
  ],
  "transform": {
    ".tsx?": "<rootDir>/node_modules/ts-jest/preprocessor.js"
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

# About Lemoncode

We are a team of long-term experienced freelance developers, established as a group in 2010.
We specialize in Front End technologies and .NET. [Click here](http://lemoncode.net/services/en/#en-home) to get more info about us.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
