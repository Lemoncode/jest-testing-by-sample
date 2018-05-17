# 05 Redux Reducers

In this sample we are going to testing Redux reducers.

We will start from sample _04 Redux Actions_.

Summary steps:
 - Implement and add unit tests to `login` reducer.
 - Implement and add unit tests to `members` reducer.

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

interface LoginState {
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

### ./src/pages/login/reducers/login.ts
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

### ./src/pages/login/reducers/login.ts
```diff
import { loginReducer } from './login';

describe('login/reducers/loginReducer tests', () => {
- it('', () => {
+ it('should return initial state when passing undefined state and some action type', () => {
    // Arrange
+   const initialState = undefined;
+   const action = { type: 'some type' };

    // Act
+   const nextState = loginReducer(initialState, action);

    // Assert
+   expect(nextState.loginEntity.login).toEqual('');
+   expect(nextState.loginEntity.password).toEqual('');
+   expect(nextState.loginFormErrors.login).toEqual(new FieldValidationResult());
+   expect(nextState.loginFormErrors.password).toEqual(new FieldValidationResult());
  });
});

```

# About Lemoncode

We are a team of long-term experienced freelance developers, established as a group in 2010.
We specialize in Front End technologies and .NET. [Click here](http://lemoncode.net/services/en/#en-home) to get more info about us.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
