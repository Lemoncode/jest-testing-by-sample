# 05 Redux Reducers

In this sample we are going to testing Redux reducers.

We will start from sample _04 Redux Actions_.

Summary steps:
 - Implement and add unit tests to `login` reducer.
 - Implement and add unit tests to `members` reducer.
 - Update `pageContainer`s to use Redux.

# Steps to build it

- `npm install` to install previous sample packages:

```bash
npm install
```

- Once, we've identified actions that it leads to reducers, we will start with `login` reducer:

### ./src/pages/login/reducers/login.ts
```javascript
import { actionIds } from '../actions/actionIds';
import {
  LoginEntity, createEmptyLoginEntity,
  LoginFormErrors, createEmptyLoginFormErrors,
} from '../viewModel';

export interface LoginState {
  loginEntity: LoginEntity;
  loginFormErrors: LoginFormErrors;
}

const createEmptyState = (): LoginState => ({
  loginEntity: createEmptyLoginEntity(),
  loginFormErrors: createEmptyLoginFormErrors(),
});

export const loginReducer = (state = createEmptyState(), action) => {
  return state;
};
```

- Implement handle update login entity field:

### ./src/pages/login/reducers/login.ts
```diff
import { actionIds } from '../actions/actionIds';
import {
  LoginEntity, createEmptyLoginEntity,
  LoginFormErrors, createEmptyLoginFormErrors,
} from '../viewModel';
...
export const loginReducer = (state = createEmptyState(), action) => {
+ switch (action.type) {
+   case actionIds.UPDATE_LOGIN_ENTITY_FIELD:
+     return handleUpdateLoginEntityField(state, action.payload);
+ }

  return state;
};

+ const handleUpdateLoginEntityField = (state: LoginState, { fieldName, value, fieldValidationResult }): LoginState => ({
+   loginEntity: {
+     ...state.loginEntity,
+     [fieldName]: value,
+   },
+   loginFormErrors: {
+     ...state.loginFormErrors,
+     [fieldName]: fieldValidationResult,
+   },
+ });
```

- Implement handle update login form errors:

### ./src/pages/login/reducers/login.ts
```diff
import { actionIds } from '../actions/actionIds';
import {
  LoginEntity, createEmptyLoginEntity,
  LoginFormErrors, createEmptyLoginFormErrors,
} from '../viewModel';
...
export const loginReducer = (state = createEmptyState(), action) => {
  switch (action.type) {
    case actionIds.UPDATE_LOGIN_ENTITY_FIELD:
      return handleUpdateLoginEntityField(state, action.payload);

+   case actionIds.UPDATE_LOGIN_FORM_ERRORS:
+     return handleUpdateLoginFormErrors(state, action.payload);
  }

  return state;
};
...

+ const handleUpdateLoginFormErrors = (state: LoginState, loginFormErrors: LoginFormErrors): LoginState => ({
+   ...state,
+   loginFormErrors,
+ });

```

- Now, we could start with unit tests:

### ./src/pages/login/reducers/login.spec.ts
```javascript
import { loginReducer } from './login';

describe('login/reducers/loginReducer tests', () => {
  it('', () => {
    // Arrange

    // Act

    // Assert
  });
});
```

- Should return initial state:

### ./src/pages/login/reducers/login.spec.ts
```diff
+ import { FieldValidationResult } from 'lc-form-validation';
import { loginReducer } from './login';

describe('login/reducers/loginReducer tests', () => {
- it('', () => {
+ it('should return initial state when passing undefined state and some action type', () => {
    // Arrange
+   const state = undefined;
+   const action = { type: 'some type' };

    // Act
+   const nextState = loginReducer(state, action);

    // Assert
+   expect(nextState.loginEntity.login).toEqual('');
+   expect(nextState.loginEntity.password).toEqual('');
+   expect(nextState.loginFormErrors.login).toEqual(new FieldValidationResult());
+   expect(nextState.loginFormErrors.password).toEqual(new FieldValidationResult());
  });
});
```

- Should return same state without mutate it:

### ./src/pages/login/reducers/login.spec.ts
```diff
import { FieldValidationResult } from 'lc-form-validation';
+ import * as deepFreeze from 'deep-freeze';
- import { loginReducer } from './login';
+ import { loginReducer, LoginState } from './login';

...
+ it('should return same state without mutate it when passing state and some action type', () => {
+   // Arrange
+   const state: LoginState = {
+     loginEntity: {
+       login: 'test login',
+       password: 'test password',
+     },
+     loginFormErrors: {
+       login: new FieldValidationResult(),
+       password: new FieldValidationResult(),
+     },
+   };
+   const action = { type: 'some type' };
+   deepFreeze(state);

+   // Act
+   const nextState = loginReducer(state, action);

+   // Assert
+   expect(nextState.loginEntity.login).toEqual('test login');
+   expect(nextState.loginEntity.password).toEqual('test password');
+   expect(nextState.loginFormErrors.login).toEqual(new FieldValidationResult());
+   expect(nextState.loginFormErrors.password).toEqual(new FieldValidationResult());
+ });
```

- Should return updated state without mutate it when update login field:

### ./src/pages/login/reducers/login.spec.ts
```diff
import { FieldValidationResult } from 'lc-form-validation';
import * as deepFreeze from 'deep-freeze';
+ import { actionIds } from '../actions/actionIds';
import { loginReducer, LoginState } from './login';

...
+ it(`should return updated state without mutate it
+ when passing state, UPDATE_LOGIN_ENTITY_FIELD action type and login field payload`, () => {
+     // Arrange
+     const state: LoginState = {
+       loginEntity: {
+         login: 'test login',
+         password: 'test password',
+       },
+       loginFormErrors: {
+         login: new FieldValidationResult(),
+         password: new FieldValidationResult(),
+       },
+     };

+     const action = {
+       type: actionIds.UPDATE_LOGIN_ENTITY_FIELD,
+       payload: {
+         fieldName: 'login',
+         value: '',
+         fieldValidationResult: {
+           succeeded: false,
+           errorMessage: 'test message',
+         } as FieldValidationResult,
+       },
+     };

+     deepFreeze(state);

+     // Act
+     const nextState = loginReducer(state, action);

+     // Assert
+     expect(nextState.loginEntity.login).toEqual('');
+     expect(nextState.loginEntity.password).toEqual('test password');
+     expect(nextState.loginFormErrors.login).toEqual({
+       errorMessage: 'test message',
+       succeeded: false,
+     } as FieldValidationResult);
+     expect(nextState.loginFormErrors.password).toEqual(new FieldValidationResult());
+   });
```

- Should return updated state without mutate it when update password field:

### ./src/pages/login/reducers/login.spec.ts
```diff
...
+ it(`should return updated state without mutate it
+ when passing state, UPDATE_LOGIN_ENTITY_FIELD action type and password field payload`, () => {
+     // Arrange
+     const state: LoginState = {
+       loginEntity: {
+         login: 'test login',
+         password: 'test password',
+       },
+       loginFormErrors: {
+         login: new FieldValidationResult(),
+         password: new FieldValidationResult(),
+       },
+     };

+     const action = {
+       type: actionIds.UPDATE_LOGIN_ENTITY_FIELD,
+       payload: {
+         fieldName: 'password',
+         value: 'updated password',
+         fieldValidationResult: {
+           succeeded: true,
+           errorMessage: '',
+         } as FieldValidationResult,
+       },
+     };

+     deepFreeze(state);

+     // Act
+     const nextState = loginReducer(state, action);

+     // Assert
+     expect(nextState.loginEntity.login).toEqual('test login');
+     expect(nextState.loginEntity.password).toEqual('updated password');
+     expect(nextState.loginFormErrors.login).toEqual(new FieldValidationResult());
+     expect(nextState.loginFormErrors.password).toEqual({
+       errorMessage: '',
+       succeeded: true,
+     } as FieldValidationResult);
+   });
```

- Should return updated state without mutate it when update form errors:

### ./src/pages/login/reducers/login.spec.ts
```diff
import { FieldValidationResult } from 'lc-form-validation';
import * as deepFreeze from 'deep-freeze';
import { actionIds } from '../actions/actionIds';
+ import { LoginFormErrors } from '../viewModel';
import { loginReducer, LoginState } from './login';

...
+ it(`should return updated state without mutate it
+ when passing state, UPDATE_LOGIN_FORM_ERRORS action type and loginFormErrors payload`, () => {
+     // Arrange
+     const state: LoginState = {
+       loginEntity: {
+         login: 'test login',
+         password: 'test password',
+       },
+       loginFormErrors: {
+         login: new FieldValidationResult(),
+         password: new FieldValidationResult(),
+       },
+     };

+     const action = {
+       type: actionIds.UPDATE_LOGIN_FORM_ERRORS,
+       payload: {
+         login: { succeeded: false, errorMessage: 'test login message' },
+         password: { succeeded: false, errorMessage: 'test password message' },
+       } as LoginFormErrors,
+     };

+     deepFreeze(state);

+     // Act
+     const nextState = loginReducer(state, action);

+     // Assert
+     expect(nextState.loginEntity.login).toEqual('test login');
+     expect(nextState.loginEntity.password).toEqual('test password');
+     expect(nextState.loginFormErrors.login).toEqual({
+       errorMessage: 'test login message',
+       succeeded: false,
+     } as FieldValidationResult);
+     expect(nextState.loginFormErrors.password).toEqual({
+       errorMessage: 'test password message',
+       succeeded: false,
+     } as FieldValidationResult);
+   });
```

- Implementing `members` reducer:

### ./src/pages/members/list/reducers/members.ts
```javascript
import { actionIds } from '../actions/actionIds';
import { Member } from '../viewModel';

export type MembersState = Member[];

export const membersReducer = (state = [], action): MembersState => {
  return state;
};
```

- Implementing `handleUpdateMembers` statement:

### ./src/pages/members/list/reducers/members.ts
```diff
import { actionIds } from '../actions/actionIds';
import { Member } from '../viewModel';

export type MembersState = Member[];

export const membersReducer = (state = [], action): MembersState => {
+ switch (action.type) {
+   case actionIds.UPDATE_MEMBERS:
+     return handleUpdateMembers(state, action.payload);
+ }
  return state;
};

+ const handleUpdateMembers = (state: MembersState, members: Member[]): MembersState => (
+   members
+ );
```

- Now, we could start with unit tests:

### ./src/pages/members/list/reducers/members.spec.ts
```javascript
import { membersReducer, MembersState } from './members';

describe('members/list/reducers/membersReducer tests', () => {
  it('', () => {
    // Arrange

    // Act

    // Assert
  });
});
```

- Should return initial state:

### ./src/pages/members/list/reducers/members.spec.ts
```diff
import { membersReducer, MembersState } from './members';

describe('members/list/reducers/membersReducer tests', () => {
- it('', () => {
+ it('should return initial state when passing undefined state and some action type', () => {
    // Arrange
+   const state = undefined;
+   const action = { type: 'some type' };

    // Act
+   const nextState = membersReducer(state, action);

    // Assert
+   expect(nextState).toEqual([]);
  });
});
```

- Should return same state without mutate it:

### ./src/pages/members/list/reducers/members.spec.ts
```diff
+ import * as deepFreeze from 'deep-freeze';
import { membersReducer, MembersState } from './members';
...
+ it('should return same state without mutate it when passing state and some action type', () => {
+   // Arrange
+   const state: MembersState = [
+     { id: 1, name: 'test name', avatarUrl: 'test avatarUrl' },
+   ];
+   const action = { type: 'some type' };
+   deepFreeze(state);

+   // Act
+   const nextState = membersReducer(state, action);

+   // Assert
+   expect(nextState).toEqual([
+     { id: 1, name: 'test name', avatarUrl: 'test avatarUrl' },
+   ]);
+ });
```

- Should return updated state without mutate it when update members:

### ./src/pages/members/list/reducers/members.spec.ts
```diff
import * as deepFreeze from 'deep-freeze';
+ import { actionIds } from '../actions/actionIds';
import { membersReducer, MembersState } from './members';
...
+ it(`should return updated state without mutate it
+ when passing state, actionIds.UPDATE_MEMBERS action type and members payload`, () => {
+     // Arrange
+     const state: MembersState = [
+       { id: 1, name: 'test name', avatarUrl: 'test avatarUrl' },
+     ];

+     const payload = [
+       { id: 2, name: 'test name 2', avatarUrl: 'test avatarUrl 2' },
+       { id: 3, name: 'test name 3', avatarUrl: 'test avatarUrl 3' },
+     ];

+     const action = {
+       type: actionIds.UPDATE_MEMBERS,
+       payload,
+     };
+     deepFreeze(state);

+     // Act
+     const nextState = membersReducer(state, action);

+     // Assert
+     expect(nextState).toEqual(payload);
+   });
```

# About Lemoncode

We are a team of long-term experienced freelance developers, established as a group in 2010.
We specialize in Front End technologies and .NET. [Click here](http://lemoncode.net/services/en/#en-home) to get more info about us.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
