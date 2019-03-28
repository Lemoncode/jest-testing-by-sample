# 10 Hooks

In this sample we are going to test components with hooks.

We will start from sample _10 Hooks/00 Boilerplate_.

Summary steps:
 - Add tests to components with hooks.

# Steps to build it

- `npm install` to install previous sample packages:

```bash
npm install
```

- Let's add tests to `member edit page container` that it's a component with hoosk:

### ./src/pages/members/edit/pageContainer.spec.tsx

```javascript
import * as React from 'react';
import { shallow } from 'enzyme';
import { MemberEditPageContainer } from './pageContainer';

describe('pages/members/edit/pageContainer tests', () => {
  it('should render as expected feeding required properties', () => {
    // Arrange

    // Act

    // Assert

  });
});

```

- Implementing snapshot specs:

### ./src/pages/members/edit/pageContainer.spec.tsx

```diff
import * as React from 'react';
import { shallow } from 'enzyme';
import { MemberEditPageContainer } from './pageContainer';

describe('pages/members/edit/pageContainer tests', () => {
  it('should render as expected feeding required properties', () => {
    // Arrange
+   const props: any = {
+     match: {
+       params: {
+         name: 'test user name',
+       },
+     },
+   };

    // Act
+   const component = shallow(<MemberEditPageContainer {...props} />);

    // Assert
+   expect(component).toMatchSnapshot();
  });
});

```

- Now we can see that snapshot was generated:

```javascript
// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`pages/members/edit/pageContainer tests should render as expected feeding required properties 1`] = `
<Component
  member={
    Object {
      "avatarUrl": "",
      "id": -1,
      "name": "",
    }
  }
  onSave={[Function]}
  onUpdateField={[Function]}
/>
`;

```

- Should call to `fetchMember` on mount:

### ./src/pages/members/edit/pageContainer.spec.tsx

```diff
import * as React from 'react';
import { shallow } from 'enzyme';
+ import * as memberAPI from '../../../rest-api/api/member';
+ import * as model from '../../../rest-api/model';
import { MemberEditPageContainer } from './pageContainer';

...
+ it('should call to fetchMember on mount', () => {
+   // Arrange
+   const props: any = {
+     match: {
+       params: {
+         name: 'test user name',
+       },
+     },
+   };

+   const mockMember: model.Member = {
+     id: 1,
+     login: 'testLogin',
+     avatar_url: 'testAvatarUrl',
+   };
+   const fetchMemberStub = jest
+     .spyOn(memberAPI, 'fetchMember')
+     .mockResolvedValue(mockMember);

+   // Act
+   const component = shallow(<MemberEditPageContainer {...props} />);

+   // Assert
+   expect(fetchMemberStub).toHaveBeenCalledWith(props.match.params.name);
+ });

```

- As we see, it is failing. Notice that we are testing the "old" componentDidMount, that means we need use enzyme `mount` method to check this code:

### ./src/pages/members/edit/pageContainer.spec.tsx

```diff
import * as React from 'react';
- import { shallow } from 'enzyme';
+ import { shallow, mount } from 'enzyme';
...

  it('should call to fetchMember on mount', () => {
...

    // Act
-   const component = shallow(<MemberEditPageContainer {...props} />);
+   const component = mount(<MemberEditPageContainer {...props} />);
...
  });

```

- Should call to `mapMemberModelToVM` on mount:

### ./src/pages/members/edit/pageContainer.spec.tsx

```diff
import * as React from 'react';
import { shallow, mount } from 'enzyme';
import * as memberAPI from '../../../rest-api/api/member';
import * as model from '../../../rest-api/model';
+ import * as vm from './viewModel';
+ import * as mappers from './mappers';
import { MemberEditPageContainer } from './pageContainer';
...

+ it('should call to mapMemberModelToVM on mount', () => {
+   // Arrange
+   const props: any = {
+     match: {
+       params: {
+         name: 'test user name',
+       },
+     },
+   };

+   const mockMember: model.Member = {
+     id: 1,
+     login: 'testLogin',
+     avatar_url: 'testAvatarUrl',
+   };
+   const fetchMemberStub = jest
+     .spyOn(memberAPI, 'fetchMember')
+     .mockResolvedValue(mockMember);

+   const mockVmMember: vm.Member = {
+     id: 1,
+     name: 'testName',
+     avatarUrl: 'testAvatarUrl',
+   };
+   const mapperStub = jest
+     .spyOn(mappers, 'mapMemberModelToVM')
+     .mockReturnValue(mockVmMember);

+   // Act
+   const component = mount(<MemberEditPageContainer {...props} />);

+   // Assert
+   expect(mapperStub).toHaveBeenCalledWith(mockMember);
+ });

```

- We saw that test is failing, due to we must use [act](https://reactjs.org/docs/test-utils.html#act) when there is some React state update:

### ./src/pages/members/edit/pageContainer.spec.tsx

```diff
...
- it('should call to mapMemberModelToVM on mount', () => {
+ it('should call to mapMemberModelToVM on mount', done => {
    // Arrange
...

    // Assert
+   setImmediate(() => {
      expect(mapperStub).toHaveBeenCalledWith(mockMember);
+     done();
+   });
  });
```

- Should update member when fire onUpdateField:

### ./src/pages/members/edit/pageContainer.spec.tsx

```diff
...

+ it('should update member when fire onUpdateField', () => {
+   // Arrange
+   const props: any = {
+     match: {
+       params: {
+         name: 'test user name',
+       },
+     },
+   };

+   // Act
+   const component = shallow(<MemberEditPageContainer {...props} />);

+   component.prop('onUpdateField')('name', 'updated name');

+   // Assert
+   expect(component).toMatchSnapshot();
+ });

```

# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
