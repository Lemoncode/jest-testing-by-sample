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
  "preset": "ts-jest",
  "setupFiles": [
-   "<rootDir>/config/test/polyfills.js"
+   "<rootDir>/config/test/polyfills.js",
+   "<rootDir>/config/test/setupTest.js"
  ],
  "restoreMocks": true
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
+     />
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
+     </Body>
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
+     </Panel>
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
+     />
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
+     />
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
+     />
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
+     />
+   );

+   component.find('input').simulate('blur');

+   // Assert
+   expect(props.onBlur).toHaveBeenCalled();
+ });
```

- Adding `form/button` specs:

### ./src/common/components/form/button.spec.tsx
```javascript
import * as React from 'react';
import { shallow } from 'enzyme';
import { Button } from './button';

describe('common/components/form/button specs', () => {
  it('should render as expected when passing required properties', () => {
    // Arrange

    // Act

    // Assert
  });
});
```

- Should render passing required properties:

### ./src/common/components/form/button.spec.tsx
```diff
import * as React from 'react';
import { shallow } from 'enzyme';
import { Button } from './button';

describe('common/components/form/button specs', () => {
  it('should render as expected when passing required properties', () => {
    // Arrange
+   const props = {
+     label: 'test label',
+     onClick: () => {},
+   };

    // Act
+   const component = shallow(
+     <Button
+       {...props}
+     />
+   );

    // Assert
+   expect(component).toMatchSnapshot();
  });
});
```

- Should render passing required and optional properties:

### ./src/common/components/form/button.spec.tsx
```diff
...
+ it('should render as expected when passing required and optional properties', () => {
+   // Arrange
+   const props = {
+     label: 'test label',
+     onClick: () => {},
+     type: 'test type',
+   };

+   // Act
+   const component = shallow(
+     <Button
+       {...props}
+     />
+   );

+   // Assert
+   expect(component).toMatchSnapshot();
+ });
```

- Should call onClick prop when simulate button click:

### ./src/common/components/form/button.spec.tsx
```diff
...
+ it('should call onClick prop when simulate button click', () => {
+   // Arrange
+   const props = {
+     label: 'test label',
+     onClick: jest.fn(),
+     type: 'test type',
+   };

+   // Act
+   const component = shallow(
+     <Button
+       {...props}
+     />
+   );

+   const preventDefaultSpy = jest.fn();
+   component.simulate('click', {
+     preventDefault: preventDefaultSpy,
+   });

+   // Assert
+   expect(props.onClick).toHaveBeenCalled();
+   expect(preventDefaultSpy).toHaveBeenCalled();
+ });
```

- Adding `login/pageContainer` specs:

### ./src/pages/login/pageContainer.spec.tsx
```javascript
import * as React from 'react';
import { shallow } from 'enzyme';
import { LoginPageContainer } from './pageContainer';

describe('pages/login/pageContainer tests', () => {
  it('should render as expected', () => {
    // Arrange

    // Act

    // Assert
  });
});
```

- Implementing snapshot specs:

### ./src/pages/login/pageContainer.spec.tsx
```diff
import * as React from 'react';
import { shallow } from 'enzyme';
import { LoginPageContainer } from './pageContainer';

describe('pages/login/pageContainer tests', () => {
  it('should render as expected', () => {
    // Arrange

    // Act
+   const component = shallow(
+     <LoginPageContainer
+     />
+   );

    // Assert
+   expect(component).toMatchSnapshot();
  });
});
```

- As we see, this spec is failing because we need provide the Redux `store`. It's time to use `redux-mock-store` again:

> NOTE: Instead of use Provider from `react-redux` and mount, we are providing context by shallow method.

### ./src/pages/login/pageContainer.spec.tsx
```diff
import * as React from 'react';
import { shallow } from 'enzyme';
+ import configureStore from 'redux-mock-store';
+ import { State } from '../reducers';
+ import { createEmptyLoginFormErrors, createEmptyLoginEntity } from './viewModel';
import { LoginPageContainer } from './pageContainer';

+ const getMockStore = configureStore();

describe('pages/login/pageContainer tests', () => {
- it('should render as expected', () => {
+ it('should render as expected passing state', () => {
    // Arrange
+   const state = {
+     login: {
+       loginEntity: createEmptyLoginEntity(),
+       loginFormErrors: createEmptyLoginFormErrors(),
+     },
+   } as State;

+   const store = getMockStore(state);

    // Act
    const component = shallow(
      <LoginPageContainer
-     />
+     />,
+     {
+       context: { store },
+     }
    );

    // Assert
    expect(component).toMatchSnapshot();
  });
});
```

- Should call to `updateLoginEntityField` action creator:

### ./src/pages/login/pageContainer.spec.tsx
```diff
import * as React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { State } from '../reducers';
import { createEmptyLoginFormErrors, createEmptyLoginEntity } from './viewModel';
+ import * as updateFieldActions from './actions/updateLoginEntityField';
import { LoginPageContainer } from './pageContainer';

...

+ it('should call to updateLoginEntityField action creator when call to updateField prop', () => {
+   // Arrange
+   const state = {
+     login: {
+       loginEntity: createEmptyLoginEntity(),
+       loginFormErrors: createEmptyLoginFormErrors(),
+     },
+   } as State;

+   const store = getMockStore(state);
+   const actionCreatorStub = jest.spyOn(updateFieldActions, 'updateLoginEntityField')
+   .mockImplementation(() => ({
+     type: 'test action type',
+   }));

+   // Act
+   const component = shallow(
+     <LoginPageContainer
+     />,
+     {
+       context: { store },
+     }
+   );

+   component.prop('updateField')('test fieldName', 'test value');

+   // Assert
+   expect(actionCreatorStub).toHaveBeenCalledWith(state.login.loginEntity, 'test fieldName', 'test value');
+ });
```

- Should call to `loginRequest` action creator:

### ./src/pages/login/pageContainer.spec.tsx
```diff
import * as React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { State } from '../reducers';
import { createEmptyLoginFormErrors, createEmptyLoginEntity } from './viewModel';
import * as updateFieldActions from './actions/updateLoginEntityField';
+ import * as loginRequestActions from './actions/loginRequest';
import { LoginPageContainer } from './pageContainer';

...

+ it('should call to loginRequest action creator when call to doLogin prop', () => {
+   // Arrange
+   const state = {
+     login: {
+       loginEntity: createEmptyLoginEntity(),
+       loginFormErrors: createEmptyLoginFormErrors(),
+     },
+   } as State;

+   const store = getMockStore(state);
+   const actionCreatorStub = jest.spyOn(loginRequestActions, 'loginRequest')
+     .mockImplementation(() => ({
+       type: 'test action type',
+     }));

+   // Act
+   const component = shallow(
+     <LoginPageContainer
+     />,
+     {
+       context: { store },
+     }
+   );

+   component.prop('doLogin')();

+   // Assert
+   expect(actionCreatorStub).toHaveBeenCalledWith(state.login.loginEntity);
+ });
```

- Adding `members/list/pageContainer` specs:

### ./src/pages/members/list/pageContainer.spec.tsx
```javascript
import * as React from 'react';
import { shallow } from 'enzyme';
import { MemberListPageContainer } from './pageContainer';

describe('pages/members/list/pageContainer tests', () => {
  it('should render as expected passing state', () => {
    // Arrange

    // Act

    // Assert
  });
});
```

- Implementing snapshot specs:

### ./src/pages/members/list/pageContainer.spec.tsx
```diff
import * as React from 'react';
import { shallow } from 'enzyme';
+ import configureStore from 'redux-mock-store';
+ import { State } from '../../reducers';
import { MemberListPageContainer } from './pageContainer';

+ const getMockStore = configureStore();

describe('pages/members/list/pageContainer tests', () => {
  it('should render as expected passing state', () => {
    // Arrange
+   const state = {
+     members: [
+       {
+         id: 1,
+         login: 'test login',
+         avatar_url: 'test avatar_url',
+       },
+     ],
+   } as State;

+   const store = getMockStore(state);

    // Act
+   const component = shallow(
+     <MemberListPageContainer
+     />,
+     {
+       context: { store },
+     }
+   );

    // Assert
+   expect(component).toMatchSnapshot();
  });
});
```

- Should call to `mapMemberListModelToVM`:

### ./src/pages/members/list/pageContainer.spec.tsx
```diff
import * as React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { State } from '../../reducers';
+ import * as mappers from './mappers';
import { MemberListPageContainer } from './pageContainer';

...

+ it('should call to mapMemberListModelToVM when render component', () => {
+   // Arrange
+   const state = {
+     members: [
+       {
+         id: 1,
+         login: 'test login',
+         avatar_url: 'test avatar_url',
+       },
+     ],
+   } as State;

+   const store = getMockStore(state);

+   const mapMemberListModelToVMStub = jest.spyOn(mappers, 'mapMemberListModelToVM')
+     .mockReturnValue([
+       { id: 1, name: 'test login', avatarUrl: 'tes avatar_url' },
+     ]);

+   // Act
+   const component = shallow(
+     <MemberListPageContainer
+     />,
+     {
+       context: { store },
+     }
+   );

+   // Assert
+   expect(mapMemberListModelToVMStub).toHaveBeenCalledWith(state.members);
+ });
```

- Should call to `fetchMembers` action creator:

### ./src/pages/members/list/pageContainer.spec.tsx
```diff
import * as React from 'react';
- import { shallow } from 'enzyme';
+ import { shallow, mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { State } from '../../reducers';
import * as mappers from './mappers';
+ import * as fetchMemberActions from './actions/fetchMembers';
import { MemberListPageContainer } from './pageContainer';

...

+ it('should call to fetchMembers action creator when render component', () => {
+   // Arrange
+   const state = {
+     members: [
+       {
+         id: 1,
+         login: 'test login',
+         avatar_url: 'test avatar_url',
+       },
+     ],
+   } as State;

+   const store = getMockStore(state);

+   const fetchMembersStub = jest.spyOn(fetchMemberActions, 'fetchMembers')
+     .mockImplementation(() => ({
+       type: 'test action type',
+     }));

+   // Act
+   const component = mount(
+     <MemberListPageContainer
+     />,
+     {
+       context: { store },
+     }
+   );

+   // Assert
+   expect(fetchMembersStub).toHaveBeenCalled();
+ });
```

## Testing components with CSS Modules

The advantage using CSS Modules in components is that we have an unique identifier for class name. But we need to avoid that for testing.

- Adding styles to panel header:

### ./src/common/components/panel/components/header.scss
```scss
.header {
  background-color: #28A745;
  color: white;
}
```

- Updating panel header:

### ./src/common/components/panel/components/header.tsx
```diff
import * as React from 'react';
+ const styles = require('./header.scss');

interface Props {
  title: string;
}

export const Header = (props: Props) => (
- <div className="card-header">
+ <div className={`card-header ${styles.header}`}>
    <h3 className="panel-title">{props.title}</h3>
  </div>
);
```

- If we run `npm test`, we could see some failed specs:

```bash
npm test
```

- Thats why we need install and configure [identity-obj-proxy](https://github.com/keyanzhang/identity-obj-proxy):

### ./config/test/jest.json

```diff
...
    "snapshotSerializers": [
      "enzyme-to-json/serializer"
-   ]
+   ],
+   "moduleNameMapper": {
+     "^.+\\.s?css$": "identity-obj-proxy"
+   }

```

- If we run now `npm run test:watch`, we could see that we have to update only one snapshot testing due to add a new css class:

```bash
npm run test:watch
```

- We need to press `u` jest option.

# About Lemoncode

We are a team of long-term experienced freelance developers, established as a group in 2010.
We specialize in Front End technologies and .NET. [Click here](http://lemoncode.net/services/en/#en-home) to get more info about us.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
