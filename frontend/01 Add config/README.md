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

- [enzyme](https://github.com/airbnb/enzyme): Testing utility for React that makes it easier to work with DOM.
  - Pros: intuitive API for DOM manipulation.
  - Cons: it needs to install other libraries to snapshot testing,
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


```bash
npm install deep-freeze @types/deep-freeze @types/redux-mock-store -D

```

- Save exact version due to [breaking changes in 1.5 version](https://github.com/arnaudbenard/redux-mock-store/issues/135)
```bash
npm install redux-mock-store@1.4 -D -E

```

# About Lemoncode

We are a team of long-term experienced freelance developers, established as a group in 2010.
We specialize in Front End technologies and .NET. [Click here](http://lemoncode.net/services/en/#en-home) to get more info about us.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
