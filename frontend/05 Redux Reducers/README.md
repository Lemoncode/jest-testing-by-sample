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
+ import deepFreeze from 'deep-freeze';
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
import deepFreeze from 'deep-freeze';
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
import deepFreeze from 'deep-freeze';
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
import { Member } from '../../../../rest-api/model';

export type MembersState = Member[];

export const membersReducer = (state = [], action): MembersState => {
  return state;
};
```

- Implementing `handleUpdateMembers` statement:

### ./src/pages/members/list/reducers/members.ts
```diff
import { actionIds } from '../actions/actionIds';
import { Member } from '../../../../rest-api/model';

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
+ import deepFreeze from 'deep-freeze';
import { membersReducer, MembersState } from './members';
...
+ it('should return same state without mutate it when passing state and some action type', () => {
+   // Arrange
+   const state: MembersState = [
+     { id: 1, login: 'test login', avatar_url: 'test avatar_url' },
+   ];
+   const action = { type: 'some type' };
+   deepFreeze(state);

+   // Act
+   const nextState = membersReducer(state, action);

+   // Assert
+   expect(nextState).toEqual([
+     { id: 1, login: 'test login', avatar_url: 'test avatar_url' },
+   ]);
+ });
```

- Should return updated state without mutate it when update members:

### ./src/pages/members/list/reducers/members.spec.ts
```diff
import deepFreeze from 'deep-freeze';
+ import { actionIds } from '../actions/actionIds';
import { membersReducer, MembersState } from './members';
...
+ it(`should return updated state without mutate it
+ when passing state, actionIds.UPDATE_MEMBERS action type and members payload`, () => {
+     // Arrange
+     const state: MembersState = [
+       { id: 1, login: 'test login', avatar_url: 'test avatar_url' },
+     ];

+     const payload = [
+       { id: 2, login: 'test login 2', avatar_url: 'test avatar_url 2' },
+       { id: 3, login: 'test login 3', avatar_url: 'test avatar_url 3' },
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

- Now we could combine `login` reducer:

### ./src/pages/login/reducers/index.ts
```javascript
export * from './login';
```

### ./src/pages/login/index.ts
```diff
export * from './pageContainer';
+ export * from './reducers';
```

### ./src/pages/reducers.ts
```diff
import { combineReducers } from 'redux';
+ import { loginReducer, LoginState } from './login';

export interface State {
+ login: LoginState;
}

export const reducers = combineReducers<State>({
+ login: loginReducer,
});
```

- And combine `members` reducer:

### ./src/pages/members/list/reducers/index.ts
```javascript
export * from './members';
```

### ./src/pages/members/list/index.ts
```diff
export * from './pageContainer';
+ export * from './reducers';
```

### ./src/pages/reducers.ts
```diff
import { combineReducers } from 'redux';
import { loginReducer, LoginState } from './login';
+ import { membersReducer, MembersState } from './members/list';

export interface State {
  login: LoginState;
+ members: MembersState;
}

export const reducers = combineReducers<State>({
  login: loginReducer,
+ members: membersReducer,
});
```

- Finally, we have to update `login pageContainer`, we could start migrating `mapStateToProps`:

### ./src/pages/login/pageContainer.tsx
```diff
+ import { connect } from 'react-redux';
+ import { State } from '../reducers';
- import * as React from 'react';
- import { history } from '../../history';
- import {
-   LoginEntity, createEmptyLoginEntity,
-   LoginFormErrors, createEmptyLoginFormErrors,
- } from './viewModel';
- import { validations } from './validations';
import { LoginPage } from './page';
- import { routes } from '../../common/constants/routes';
- import { login } from '../../rest-api/api/login';
- import { mapLoginEntityVMToModel } from './mappers';
- import { FieldValidationResult } from 'lc-form-validation';

- interface State {
-   loginEntity: LoginEntity;
-   loginFormErrors: LoginFormErrors;
- }

+ const mapStateToProps = (state: State) => ({
+   loginEntity: state.login.loginEntity,
+   loginFormErrors: state.login.loginFormErrors,
+ });
...
```

- Now the `mapDispatchToProps`:

### ./src/pages/login/pageContainer.tsx
```diff
import { connect } from 'react-redux';
import { State } from '../reducers';
+ import { updateLoginEntityField } from './actions/updateLoginEntityField';
+ import { loginRequest } from './actions/loginRequest';
+ import { LoginEntity } from './viewModel';
import { LoginPage } from './page';

const mapStateToProps = (state: State) => ({
  loginEntity: state.login.loginEntity,
  loginFormErrors: state.login.loginFormErrors,
});

+ const mapDispatchToProps = (dispatch) => ({
+   updateField: (loginEntity: LoginEntity, fieldName: string, value: any) => dispatch(
+     updateLoginEntityField(loginEntity, fieldName, value),
+   ),
+   doLogin: (loginEntity: LoginEntity) => dispatch(loginRequest(loginEntity)),
+ });

export class LoginPageContainer extends React.PureComponent<{}, State> {
- state = {
-   loginEntity: createEmptyLoginEntity(),
-   loginFormErrors: createEmptyLoginFormErrors(),
- };

- updateField = (fieldName: string, value: any) => {
-   validations.validateField(this.state.loginEntity, fieldName, value)
-     .then((fieldValidationResult) => {
-       this.setState({
-         loginEntity: {
-           ...this.state.loginEntity,
-           [fieldName]: value,
-         },
-         loginFormErrors: {
-           ...this.state.loginFormErrors,
-           [fieldName]: fieldValidationResult,
-         },
-       });
-     });
- }

- doLogin = () => {
-   validations.validateForm(this.state.loginEntity)
-     .then((formValidationResult) => {
-       formValidationResult.succeeded ?
-         this.loginRequest() :
-         this.displayErrors(formValidationResult.fieldErrors);
-     });
- }

- loginRequest = () => {
-   const loginEntity = mapLoginEntityVMToModel(this.state.loginEntity);
-   login(loginEntity)
-     .then(() => {
-       history.push(routes.members);
-     })
-     .catch(alert);
- }

- displayErrors = (fieldErrors: FieldValidationResult[]) => {
-   const loginFormErrors = fieldErrors.reduce((errors, fieldValidationResult) => ({
-     ...errors,
-     [fieldValidationResult.key]: fieldValidationResult,
-   }), createEmptyLoginFormErrors());

-   this.setState({
-     loginFormErrors,
-   });
- }
...
```

- Update the `component`:

### ./src/pages/login/pageContainer.tsx
```diff
import { connect } from 'react-redux';
import { State } from '../reducers';
import { updateLoginEntityField } from './actions/updateLoginEntityField';
import { loginRequest } from './actions/loginRequest';
import { LoginEntity } from './viewModel';
import { LoginPage } from './page';

const mapStateToProps = (state: State) => ({
  loginEntity: state.login.loginEntity,
  loginFormErrors: state.login.loginFormErrors,
});

const mapDispatchToProps = (dispatch) => ({
  updateField: (loginEntity: LoginEntity, fieldName: string, value: any) => dispatch(
    updateLoginEntityField(loginEntity, fieldName, value),
  ),
  doLogin: (loginEntity: LoginEntity) => dispatch(loginRequest(loginEntity)),
});

- export class LoginPageContainer extends React.PureComponent<{}, State> {
-   render() {
-     return (
-       <LoginPage
-         loginEntity={this.state.loginEntity}
-         loginFormErrors={this.state.loginFormErrors}
-         updateField={this.updateField}
-         doLogin={this.doLogin}
-       />
-     );
-   }
- }
+ export const LoginPageContainer = connect(
+   mapStateToProps,
+   mapDispatchToProps,
+ )(LoginPage);
```

- We could avoid to change our presentational components:

> Resource: [`mergeProps`](https://github.com/reduxjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options)

### ./src/pages/login/pageContainer.tsx
```diff
import { connect } from 'react-redux';
import { State } from '../reducers';
import { updateLoginEntityField } from './actions/updateLoginEntityField';
import { loginRequest } from './actions/loginRequest';
import { LoginEntity } from './viewModel';
import { LoginPage } from './page';

const mapStateToProps = (state: State) => ({
  loginEntity: state.login.loginEntity,
  loginFormErrors: state.login.loginFormErrors,
});

const mapDispatchToProps = (dispatch) => ({
- updateField: (loginEntity: LoginEntity, fieldName: string, value: any) => dispatch(
+ updateField: (loginEntity: LoginEntity) => (fieldName: string, value: any) => dispatch(
    updateLoginEntityField(loginEntity, fieldName, value),
  ),
- doLogin: (loginEntity: LoginEntity) => dispatch(loginRequest(loginEntity)),
+ doLogin: (loginEntity: LoginEntity) => () => dispatch(loginRequest(loginEntity)),
});

+ const mergeProps = (stateProps, dispatchProps, ownProps) => ({
+   ...ownProps,
+   ...stateProps,
+   updateField: dispatchProps.updateField(stateProps.loginEntity),
+   doLogin: dispatchProps.doLogin(stateProps.loginEntity),
+ });

export const LoginPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
+ mergeProps,
)(LoginPage);

```

- Migrating `members` pageContainer:

### ./src/pages/members/list/pageContainer.tsx
```diff
import * as React from 'react';
+ import { connect } from 'react-redux';
+ import { State } from '../../reducers';
+ import { mapMemberListModelToVM } from './mappers';
import { MemberListPage } from './page';
- import { Member } from './viewModel';
- import { fetchMembers } from '../../../rest-api/api/member';
- import { mapMemberListModelToVM } from './mappers';

+ const mapStateToProps = (state: State) => ({
+   members: mapMemberListModelToVM(state.members),
+ });

- interface State {
-   members: Member[];
- }

export class MemberListPageContainer extends React.PureComponent<{}, State> {
-   state = {
-     members: [],
-   };
...
```

- `mapDispatchToProps`:

### ./src/pages/members/list/pageContainer.tsx
```diff
import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../../reducers';
import { mapMemberListModelToVM } from './mappers';
+ import { fetchMembers } from './actions/fetchMembers';
+ import { Member } from './viewModel';
import { MemberListPage } from './page';

const mapStateToProps = (state: State) => ({
  members: mapMemberListModelToVM(state.members),
});

+ const mapDispatchToProps = (dispatch) => ({
+   fetchMembers: () => dispatch(fetchMembers()),
+ });

+ interface Props {
+   members: Member[];
+   fetchMembers: () => void;
+ }

+ class PageContainer extends React.PureComponent<Props, {}> {
+   componentDidMount() {
+     this.props.fetchMembers();
+   }

+   render() {
+     return (
+       <MemberListPage
+         members={this.props.members}
+       />
+     );
+   }
+ }

- export class MemberListPageContainer extends React.PureComponent<{}, State> {

-   componentDidMount() {
-     fetchMembers()
-       .then((members) => {
-         this.setState({
-           members: mapMemberListModelToVM(members),
-         });
-       })
-       .catch(alert);
-   }

-   render() {
-     return (
-       <MemberListPage
-         members={this.state.members}
-       />
-     );
-   }
- }
```

- Update `container`:

### ./src/pages/members/list/pageContainer.tsx
```diff
import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../../reducers';
import { mapMemberListModelToVM } from './mappers';
import { fetchMembers } from './actions/fetchMembers';
import { Member } from './viewModel';
import { MemberListPage } from './page';

const mapStateToProps = (state: State) => ({
  members: mapMemberListModelToVM(state.members),
});

const mapDispatchToProps = (dispatch) => ({
  fetchMembers: () => dispatch(fetchMembers()),
});

interface Props {
  members: Member[];
  fetchMembers: () => void;
}

class PageContainer extends React.PureComponent<Props, {}> {
  componentDidMount() {
    this.props.fetchMembers();
  }

  render() {
    return (
      <MemberListPage
        members={this.props.members}
      />
    );
  }
}

+ export const MemberListPageContainer = connect(
+   mapStateToProps,
+   mapDispatchToProps,
+ )(PageContainer);
```

# About Lemoncode

We are a team of long-term experienced freelance developers, established as a group in 2010.
We specialize in Front End technologies and .NET. [Click here](http://lemoncode.net/services/en/#en-home) to get more info about us.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
