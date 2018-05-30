# 07 Code Coverage

In this sample we are going to add test coverage to our project.

We will start from sample _06 Components_.

Summary steps:
 - Add a new command inside package.json's scripts sections.
 - Create more sophisticated configuration.

# Steps to build it

- `npm install` to install previous sample packages:

```bash
npm install
```

To get an up and working code coverage a simple script can be added to package.json to tell jest we need collect coverage report from our tests. That is, applying the `--coverage` flag:

#### `package.json`

```diff
  "build:dev": "rimraf dist && env-cmd .env cross-env NODE_ENV=development webpack --config ./config/webpack/app/dev.js",
  "build:prod": "rimraf dist && env-cmd .env cross-env NODE_ENV=production webpack -p --config ./config/webpack/app/prod.js",
  "test": "jest -c ./config/test/jest.json --verbose",
+ "test:coverage": "rimraf coverage && jest -c ./config/test/jest.json --verbose --coverage",
  "test:watch": "jest -c ./config/test/jest.json --verbose --watchAll -i"
```

Coverage reporting is a intensive task so we shouldn't execute it in _watch mode_. It's something we should do once we think we're done with our unit tests.

Let's see how this new command is working. Execute:

```bash
npm run test:coverage
```

You'll note two things. First of all, we get a nice formatted table with a coverage summary from all executed tests and tested components.

Described columns are:
- **Function coverage** -  How many functions or subrutines in the program have been called
- **Statement coverage** -  How many statements has been executed
- **Branch coverage** - How many posible paths has been called
- **Line coverage** How many executable lines has been called

Second thing you'll note is that a `coverage` folder is added with some extra files. By default jest uses three coverage tools ["text", "lcov", "json"], to report coverage results. The first one is the formatted table you saw on the console, `json` coverage result is located at `coverage/coverage-final.json` and `lcov` reports are inside `coverage/lcov-report` folder as a nice HTML document. Some extra info is added to the code:

- `'E'` stands for 'else path not taken', which means that for the marked if/else statement, the 'if' path has been tested but not the 'else'.
- `'I'` stands for 'if path not taken', which is the opposite case: the 'if' hasn't been tested.
- The `xN` in left column is the amount of times that line has been executed.
- Not executed lines, or pieces of code, will be highlighted in red.

And some colors:

- **Pink**: statements not covered.
- **Orange**: functions not covered.
- **Yellow**: branches not covered.

We'll add some extra configuration to our coverage reports. In order to do that first we'll create another jest configuration file called `jest.coverage.json` with the exact content as the previous configuration it was using. We'll add an extra line to tell jest we want to include coverage report using this new config:

#### `config/test/jest.coverage.json`

```diff
      ".tsx?": "<rootDir>/node_modules/ts-jest/preprocessor.js"
    },
    "restoreMocks": true,
    "snapshotSerializers": [
      "enzyme-to-json/serializer"
-   ]
+   ],
+   "collectCoverage": true
  }
```

Let's update coverage command inside `package.json` to point this new config and remove the `--coverage` flag:

#### `package.json`

```diff
  "test": "jest -c ./config/test/jest.json --verbose",
- "test:coverage": "rimraf coverage && jest -c ./config/test/jest.json --verbose --coverage",
+ "test:coverage": "rimraf coverage && jest -c ./config/test/jest.coverage.json --verbose",
  "test:watch": "jest -c ./config/test/jest.json --verbose --watchAll -i"
```

Let's play with some different reporting options. Add `coverageReporters` section as an array of strings in `jest.coverage.json`:

#### `config/test/jest.coverage.json`

```diff
  "snapshotSerializers": [
    "enzyme-to-json/serializer"
  ],
- "collectCoverage": true
+ "collectCoverage": true,
+ "coverageReporters": [
+   "text"
+ ]
```

You'll see executing `npm run test:coverage` that the `coverage` folder was not created and only coverage reports were reported on the terminal. This is useful for CI environments since it does not create unnecessary files in disk.

> Note: test another reporters like `clover`, `cobertura`, `html`, `lcovonly`, `json-summary`
>
> clover and cobertura: XML format
>
> html, lcov: HTML format (lcov also provides lcov.info)
>
> json, json-summary: JSON format
>
> lcovonly: lcov.info file
>
> text, text-summary, teamcity: terminal output
>
> text-lcov: text-summary + lcov.info content via terminal

Let's keep `"html"` and `"text"` as our main reporters. The former will be useful for us to have a detailed report of our files. The latter will be useful for some things like Continuous Integration.

#### `config/test/jest.coverage.json`

```diff
  "snapshotSerializers": [
    "enzyme-to-json/serializer"
  ],
  "collectCoverage": true,
  "coverageReporters": [
    "text",
+   "html"
  ]
```

We'll notice that in our tests `polyfills.js` and `setupTest.js` are coverage-reported too. Let's exclude that folder. For that we'll use `coveragePathIgnorePatterns` option:

#### `config/test/jest.coverage.json`

```diff
  "collectCoverage": true,
  "coverageReporters": [
    "text"
    "html"
- ]
+ ],
+ "coveragePathIgnorePatterns": [
+   "/node_modules/",
+   "config/test"
+ ]
```

We can configure a minimum threshold enforcement for coverage results. If thresholds aren't met, jest will fail.

#### `config/test/jest.coverage.json`

```diff
  "coveragePathIgnorePatterns": [
    "/node_modules/",
    "config/test"
- ]
+ ],
+ "coverageThreshold": {
+   "global": {
+     "branches": 80,
+     "functions": 80,
+     "lines": 80,
+     "statements": -10
+   }
+ }
```

With the following configuration jest will fail if there is less than 80% branch, line, and function coverage, or if there are more than 10 uncovered statements.
We can also specify per-file or pattern configuration:

#### `config/test/jest.coverage.json`

```diff
  "coveragePathIgnorePatterns": [
    "/node_modules/",
    "config/test"
  ],
  "coverageThreshold": {
-   "global": {
-     "branches": 80,
-     "functions": 80,
-     "lines": 80,
-     "statements": -10
+   "src/**/reducers/*.ts": {
+     "branches": 100
    }
  }
```

Finally let's add another configuration entry. Suppose we have a project were we should cover every exported function or component like a library or game engine. By default only code coverage is reported for files than are tested. What about non-tested files? Let's edit the jest configuration make jest to complain about non tested files and add them a bad report. Since we're using TypeScript for our project adding `collectCoverageFrom` entry:

```diff
  "coverageThreshold": {
    "src/**/reducers/*.ts": {
      "branches": 100
    }
- }
+ },
+ "collectCoverageFrom": [
+   "**/*.{ts,tsx}"
+ ]
```

# About Lemoncode

We are a team of long-term experienced freelance developers, established as a group in 2010.
We specialize in Front End technologies and .NET. [Click here](http://lemoncode.net/services/en/#en-home) to get more info about us.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
