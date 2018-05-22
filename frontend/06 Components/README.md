# 06 Components

In this sample we are going to testing React components.

We will start from sample _05 Redux Reducers_.

Summary steps:
 - Add components jest config.
 - Add `panel/components/header` specs.
 - Add `panel/components/body` specs.
 - Add `panel` specs.
 - Add `form/input` specs.
 - Add `form/button` specs.
 - Add `login/pageContainer` specs.
 - Add `members/list/pageContainer` specs.

# Steps to build it

- `npm install` to install previous sample packages:

```bash
npm install
```

- We can work with `jest` and `enzyme` together because `enzyme` makes it easier to assert, manipulate, and traverse your React Components' output.

- Let's create _config/test/setupTest.js_ to configure enzyme adapter:

### ./config/test/setupTest.js
```javascript
const enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

// Setup enzyme's react adapter
enzyme.configure({ adapter: new Adapter() });
```

- Update `jest` config:

### ./config/test/jest.json
```diff
{
  "rootDir": "../../",
  "testRegex": "\\.spec\\.tsx?$",
  "moduleFileExtensions": [
    "js",
    "jsx",
    "json",
    "ts",
    "tsx"
  ],
  "setupFiles": [
-   "<rootDir>/config/test/polyfills.js"
+   "<rootDir>/config/test/polyfills.js",
+   "<rootDir>/config/test/setupTest.js"
  ],
  "transform": {
    ".tsx?": "<rootDir>/node_modules/ts-jest/preprocessor.js"
  },
- "restoreMocks": true
+ "restoreMocks": true,
+ "snapshotSerializers": [
+   "enzyme-to-json/serializer"
+ ]
}
```

- Adding `panel/components/header` specs:

### ./src/common/components/panel/components/header.spec.tsx
```javascript
import * as React from 'react';
import { Header } from './header';

describe('common/components/panel/header tests', () => {
  it('should render as expected when passing required properties', () => {
    // Arrange

    // Act

    // Assert
  });
});
```

- Implementing `snapshot` spec:

### ./src/common/components/panel/components/header.spec.tsx
```diff
import * as React from 'react';
+ import { shallow } from 'enzyme';
import { Header } from './header';

describe('common/components/panel/header tests', () => {
  it('should render as expected when passing required properties', () => {
    // Arrange
+   const props = {
+     title: 'test title',
+   };

    // Act
+   const component = shallow(
+     <Header
+       {...props}
+     />,
+   );

    // Assert
+   expect(component).toMatchSnapshot();
  });
});
```

- When we run this test, it creates a snapshot test file:

> NOTE: We should include this file in repository so everybody can view this file in PR.

### ./src/common/components/panel/components/__snapshots__/header.spec.tsx.snap
```javascript
// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`common/components/panel/header tests should render as expected when passing required properties 1`] = `
<div
  className="card-header"
>
  <h3
    className="panel-title"
  >
    test title
  </h3>
</div>
`;

```

- Adding `panel/components/body` specs:

### ./src/common/components/panel/components/body.spec.tsx
```javascript
import * as React from 'react';
import { Body } from './body';

describe('common/components/panel/body tests', () => {
  it('should render as expected when passing required properties', () => {
    // Arrange

    // Act

    // Assert
  });
});
```

- Implement snapshot spec:

### ./src/common/components/panel/components/body.spec.tsx
```diff
import * as React from 'react';
+ import { shallow } from 'enzyme';
import { Body } from './body';

describe('common/components/panel/body tests', () => {
  it('should render as expected when passing required properties', () => {
    // Arrange

    // Act
+   const component = shallow(
+     <Body>
+       <h1>Test children component</h1>
+     </Body>,
+   );

    // Assert
+   expect(component).toMatchSnapshot();
  });
});
```

- Adding `panel` specs:

### ./src/common/components/panel/panel.spec.tsx
```javascript
import * as React from 'react';
import { shallow } from 'enzyme';
import { Panel } from './panel';

describe('commom/components/panel tests', () => {
  it('should render as expected when passing required properties', () => {
    // Arrange

    // Act

    // Assert
  });
});
```

- Implement snapshot spec:

### ./src/common/components/panel/panel.spec.tsx
```diff
import * as React from 'react';
import { shallow } from 'enzyme';
import { Panel } from './panel';

describe('commom/components/panel tests', () => {
  it('should render as expected when passing required properties', () => {
    // Arrange
+   const props = {
+     title: 'test title',
+   };

    // Act
+   const component = shallow(
+     <Panel {...props}>
+       <h1>Test children component</h1>
+     </Panel>,
+   );

    // Assert
+   expect(component).toMatchSnapshot();
  });
});
```

- Adding `form/input` specs:

### ./src/common/components/form/input.spec.tsx
```javascript
import * as React from 'react';
import { shallow } from 'enzyme';
import { Input } from './input';

describe('common/components/form/input specs', () => {
  it('should render as expected when passing required properties', () => {
    // Arrange

    // Act

    // Assert
  });
});
```

- Implement snapshot spec:

### ./src/common/components/form/input.spec.tsx
```diff
import * as React from 'react';
import { shallow } from 'enzyme';
import { Input } from './input';

describe('common/components/form/input specs', () => {
  it('should render as expected when passing required properties', () => {
    // Arrange
+   const props = {
+     name: 'test name',
+     label: 'test label',
+     value: 'test value',
+     onChange: () => { },
+   };

    // Act
+   const component = shallow(
+     <Input
+       {...props}
+     />,
+   );

    // Assert
+   expect(component).toMatchSnapshot();
  });
});
```

- Passing required and optional properties:

### ./src/common/components/form/input.spec.tsx
```diff
...
+ it('should render as expected when passing required and optional properties', () => {
+   // Arrange
+   const props = {
+     name: 'test name',
+     label: 'test label',
+     value: 'test value',
+     onChange: () => { },
+     onBlur: () => {},
+     error: 'test error',
+     type: 'test type',
+   };

+   // Act
+   const component = shallow(
+     <Input
+       {...props}
+     />,
+   );

+   // Assert
+   expect(component).toMatchSnapshot();
+ });
```

- Should call to onChange prop:

### ./src/common/components/form/input.spec.tsx
```diff
...
+ it('should call to onChange prop when simulate input onChange', () => {
+   // Arrange
+   const props = {
+     name: 'test name',
+     label: 'test label',
+     value: 'test value',
+     onChange: jest.fn(),
+     onBlur: () => { },
+     error: 'test error',
+     type: 'test type',
+   };

+   // Act
+   const component = shallow(
+     <Input
+       {...props}
+     />,
+   );

+   component.find('input').simulate('change', {
+     target: {
+       name: 'test name',
+       value: 'updated value',
+     },
+   });

+   // Assert
+   expect(props.onChange).toHaveBeenCalledWith('test name', 'updated value');
+ });
```

- Should call to onBlur prop:

### ./src/common/components/form/input.spec.tsx
```diff
...
+ it('should call to onBlur prop when simulate input onBlur', () => {
+   // Arrange
+   const props = {
+     name: 'test name',
+     label: 'test label',
+     value: 'test value',
+     onChange: jest.fn(),
+     onBlur: jest.fn(),
+     error: 'test error',
+     type: 'test type',
+   };

+   // Act
+   const component = shallow(
+     <Input
+       {...props}
+     />,
+   );

+   component.find('input').simulate('blur');

+   // Assert
+   expect(props.onBlur).toHaveBeenCalled();
+ });
```

- Adding `form/button` specs:

### ./src/common/components/form/input.spec.tsx
```javascript
import * as React from 'react';
import { shallow } from 'enzyme';
import { Input } from './input';

describe('common/components/form/input specs', () => {
  it('should render as expected when passing required properties', () => {
    // Arrange

    // Act

    // Assert
  });
});
```

# About Lemoncode

We are a team of long-term experienced freelance developers, established as a group in 2010.
We specialize in Front End technologies and .NET. [Click here](http://lemoncode.net/services/en/#en-home) to get more info about us.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
