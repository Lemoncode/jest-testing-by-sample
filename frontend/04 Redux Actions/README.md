# 04 Redux Actions

In this sample we are going to testing Redux actions.

We will start from sample _03 Debugging Jest_.

Summary steps:
 - Create login actions.
 - Add unit tests to login actions.
 - Add unit tests to members actions.

# Steps to build it

- `npm install` to install previous sample packages:

```bash
npm install
```

- Let's launch tests in watch mode:

```bash
npm run test:watch
```

- Before starting action specs, we are going to identify which actions we need to implement:

  - `updateLoginEntityField`
  - `loginRequest`
  - `fetchMembers`

- We will start with `login actions`:

### ./src/pages/login/actions/actionIds.ts
```javascript
export const actionIds = {
  UPDATE_LOGIN_ENTITY_FIELD: 'UPDATE_LOGIN_ENTITY_FIELD',
};
```

- If we implement basic action creator, we will:

### ./src/pages/login/actions/updateLoginEntityField.ts
```javascript
import { FieldValidationResult } from 'lc-form-validation';
import { actionIds } from './actionIds';

export const updateLoginEntityFieldCompleted =
  (fieldName: string, value: any, fieldValidationResult: FieldValidationResult) => ({
    type: actionIds.UPDATE_LOGIN_ENTITY_FIELD,
    payload: {
      fieldName,
      value,
      fieldValidationResult,
    },
  });
```

- But we are using `lc-form-validation` lib, and it's based on promises, so we have to use `redux-thunk`:

### ./src/pages/login/actions/updateLoginEntityField.ts
```diff
import { actionIds } from './actionIds';
+ import { validations } from '../validations';
+ import { LoginEntity } from '../viewModel';

+ export const updateLoginEntityField = (loginEntity: LoginEntity, fieldName: string, value: any) => (dispatch) => {
+   validations.validateField(loginEntity, fieldName, value)
+     .then((fieldValidationResult) => {
+       dispatch(updateLoginEntityFieldCompleted(fieldName, value, fieldValidationResult));
+     });
+ };

export const updateLoginEntityFieldCompleted =
  (fieldName: string, value: any, fieldValidationResult: FieldValidationResult) => ({
    type: actionIds.UPDATE_LOGIN_ENTITY_FIELD,
    payload: {
      fieldName,
      value,
      fieldValidationResult,
    },
  });
```

- Now we have action creator implemented, we are going to test it:

### ./src/pages/login/actions/updateLoginEntityField.spec.ts
```javascript
import { updateLoginEntityFieldCompleted, updateLoginEntityField } from './updateLoginEntityField';

describe('login/actions/updateLoginEntityField tests', () => {
  describe('updateLoginEntityFieldCompleted', () => {
    it('', () => {
      // Arrange

      // Act

      // Assert
    });
  });

  describe('updateLoginEntityField', () => {
    it('', () => {
      // Arrange

      // Act

      // Assert
    });
  });
});
```

- Should return action with provided values:

### ./src/pages/login/actions/updateLoginEntityField.spec.ts
```diff
+ import { FieldValidationResult } from 'lc-form-validation';
+ import { actionIds } from './actionIds';
import { updateLoginEntityFieldCompleted, updateLoginEntityField } from './updateLoginEntityField';

describe('login/actions/updateLoginEntityField tests', () => {
  describe('updateLoginEntityFieldCompleted', () => {
-   it('', () => {
+   it(`should return action with type UPDATE_LOGIN_ENTITY_FIELD and payload with values
+   when passing fieldName, value and fieldValidationResult`, () => {
      // Arrange
+     const fieldName = 'test fieldName';
+     const value = 'test value';
+     const fieldValidationResult = new FieldValidationResult();
+     fieldValidationResult.succeeded = true;

      // Act
+     const result = updateLoginEntityFieldCompleted(fieldName, value, fieldValidationResult);

      // Assert
+     expect(result.type).toEqual(actionIds.UPDATE_LOGIN_ENTITY_FIELD);
+       expect(result.payload).toEqual({
+         fieldName,
+         value,
+         fieldValidationResult,
+       });
    });
  });
...
```

- We need to mock the `redux-thunk` and `store` config:

> NOTE: Navigate to `configureStore` typings.

### ./src/pages/login/actions/updateLoginEntityField.spec.ts
```diff
import { FieldValidationResult } from 'lc-form-validation';
+ import configureStore from 'redux-mock-store';
+ import reduxThunk from 'redux-thunk';
import { actionIds } from './actionIds';
import { updateLoginEntityFieldCompleted, updateLoginEntityField } from './updateLoginEntityField';

+ const middlewares = [reduxThunk];
+ const getMockStore = configureStore(middlewares);

...
  describe('updateLoginEntityField', () => {
    it('', () => {
      // Arrange

      // Act

      // Assert
    });
  });
});
```

- Should call `validations.validateField` when passing params:

> NOTE: We need to create validateField stub to avoid execute real implementation.

### ./src/pages/login/actions/updateLoginEntityField.spec.ts
```diff
...
import { actionIds } from './actionIds';
+ import { LoginEntity } from '../viewModel';
+ import { validations } from '../validations';
import { updateLoginEntityFieldCompleted, updateLoginEntityField } from './updateLoginEntityField';
...
  describe('updateLoginEntityField', () => {
-   it('', () => {
+   it('should call to validateField with loginEntity, fieldName and value', () => {
      // Arrange
+     const loginEntity: LoginEntity = {
+       login: 'test login',
+       password: 'test password',
+     };
+     const fieldName = 'login';
+     const value = 'updated login';

+     const validateFieldStub = jest.spyOn(validations, 'validateField');

      // Act
+     const store = getMockStore();
+     store.dispatch<any>(updateLoginEntityField(loginEntity, fieldName, value))

      // Assert
    });
  });
});
```

- We are returning void in the implementation, so we could not expect anything after then execution. To solve this:

### ./src/pages/login/actions/updateLoginEntityField.ts
```diff
import { FieldValidationResult } from 'lc-form-validation';
import { actionIds } from './actionIds';
import { validations } from '../validations';
import { LoginEntity } from '../viewModel';

export const updateLoginEntityField = (loginEntity: LoginEntity, fieldName: string, value: any) => (dispatch) => {
- validations.validateField(loginEntity, fieldName, value)
+ return validations.validateField(loginEntity, fieldName, value)
    .then((fieldValidationResult) => {
      dispatch(updateLoginEntityFieldCompleted(fieldName, value, fieldValidationResult));
    });
};

...
```

- Or the shorthand:

### ./src/pages/login/actions/updateLoginEntityField.ts
```diff
import { FieldValidationResult } from 'lc-form-validation';
import { actionIds } from './actionIds';
import { validations } from '../validations';
import { LoginEntity } from '../viewModel';

- export const updateLoginEntityField = (loginEntity: LoginEntity, fieldName: string, value: any) => (dispatch) => {
-   return validations.validateField(loginEntity, fieldName, value)
+ export const updateLoginEntityField = (loginEntity: LoginEntity, fieldName: string, value: any) => (dispatch) => (
+   validations.validateField(loginEntity, fieldName, value)
      .then((fieldValidationResult) => {
        dispatch(updateLoginEntityFieldCompleted(fieldName, value, fieldValidationResult));
-     });
+     })
- };
+ );

...
```

### ./src/pages/login/actions/updateLoginEntityField.spec.ts
```diff
...
  describe('updateLoginEntityField', () => {
-   it('should call to validateField with loginEntity, fieldName and value', () => {
+   it('should call to validateField with loginEntity, fieldName and value', (done) => {
 ...
      // Act
      const store = getMockStore();
      store.dispatch<any>(updateLoginEntityField(loginEntity, fieldName, value))
+     .then(() => {
        // Assert
+       expect(validateFieldStub).toHaveBeenCalledWith(loginEntity, fieldName, value);
+       done();
+     });
    });
  });
});
```

- Should dispatch completed action:

> NOTE: We could use:

### ./src/pages/login/actions/updateLoginEntityField.spec.ts
```diff
...
+   it(`should dispatch action with type UPDATE_LOGIN_ENTITY_FIELD and
+     payload with fieldName, value and fieldValidationResult`, (done) => {
+     // Arrange
+     const loginEntity: LoginEntity = {
+       login: 'test login',
+       password: 'test password',
+     };
+     const fieldName = 'login';
+     const value = 'updated login';

+     const fieldValidationResult = new FieldValidationResult();
+     fieldValidationResult.succeeded = true;

+     const validateFieldStub = jest.spyOn(validations, 'validateField')
+       .mockResolvedValue(fieldValidationResult);

+     // Act
+     const store = getMockStore();
+     store.dispatch<any>(updateLoginEntityField(loginEntity, fieldName, value))
+       .then(() => {
+         // Assert
+         const expectedAction = store.getActions()[0];
+         expect(expectedAction.type).toEqual(actionIds.UPDATE_LOGIN_ENTITY_FIELD);
+         expect(expectedAction.payload.fieldName).toEqual(fieldName);
+         expect(expectedAction.payload.value).toEqual(value);
+         expect(expectedAction.payload.fieldValidationResult.succeeded).toBeTruthy();
+         expect(validateFieldStub).toHaveBeenCalledWith(loginEntity, fieldName, value)
+         done();
+       });
+   });
```

- We could continue with `login request` action:

### ./src/pages/login/actions/loginRequest.ts
```javascript
import { validations } from '../validations';
import { LoginEntity } from '../viewModel';

export const loginRequest = (loginEntity: LoginEntity) => (dispatch) => (
  validations.validateForm(loginEntity)
    .then((formValidationResult) => {
      formValidationResult.succeeded ?
        doLogin(loginEntity) :
        dispatch(updateLoginFormErrors(formValidationResult.fieldErrors));
  })
);
```

- Implement `doLogin`:

### ./src/pages/login/actions/loginRequest.ts
```diff
import { validations } from '../validations';
import { LoginEntity } from '../viewModel';
+ import { mapLoginEntityVMToModel } from '../mappers';
+ import { login } from '../../../rest-api/api/login';
+ import { history } from '../../../history';
+ import { routes } from '../../../common/constants/routes';

export const loginRequest = (loginEntity: LoginEntity) => (dispatch) => (
  validations.validateForm(loginEntity)
    .then((formValidationResult) => {
      formValidationResult.succeeded ?
        doLogin(loginEntity) :
        dispatch(updateLoginFormErrors(formValidationResult.fieldErrors));
  })
);

+ const doLogin = (loginEntity: LoginEntity) => {
+   const loginEntityModel = mapLoginEntityVMToModel(loginEntity);
+   login(loginEntityModel)
+     .then(() => {
+       history.push(routes.members);
+     })
+     .catch(console.log);
+ };
```

- Implement `updateLoginFormErrors`:

### ./src/pages/login/actions/loginRequest.ts
```diff
export const actionIds = {
  UPDATE_LOGIN_ENTITY_FIELD: 'UPDATE_LOGIN_ENTITY_FIELD',
+ UPDATE_LOGIN_FORM_ERRORS: 'UPDATE_LOGIN_FORM_ERRORS',
};
```

### ./src/pages/login/actions/loginRequest.ts
```diff
+ import { FieldValidationResult } from 'lc-form-validation';
import { validations } from '../validations';
- import { LoginEntity } from '../viewModel';
+ import { LoginEntity, createEmptyLoginFormErrors } from '../viewModel';
import { mapLoginEntityVMToModel } from '../mappers';
import { login } from '../../../rest-api/api/login';
import { history } from '../../../history';
import { routes } from '../../../common/constants/routes';
+ import { actionIds } from './actionIds';

...

+  const updateLoginFormErrors = (fieldErrors: { [key: string]: FieldValidationResult }) => ({
+  type: actionIds.UPDATE_LOGIN_FORM_ERRORS,
+  payload: fieldErrors,
+ });
```

- Time to test it:

### ./src/pages/login/actions/loginRequest.spec.ts
```javascript
import configureStore from 'redux-mock-store';
import reduxThunk from 'redux-thunk';
import { loginRequest } from './loginRequest';

const middlewares = [reduxThunk];
const getMockStore = configureStore(middlewares);

describe('login/actions/loginRequest tests', () => {
  it('should call to validateForm with loginEntity', () => {
    // Arrange

    // Act

    // Assert
  });
});
```

- Should call to validateForm with loginEntity:

### ./src/pages/login/actions/loginRequest.spec.ts
```diff
import configureStore from 'redux-mock-store';
import reduxThunk from 'redux-thunk';
+ import { LoginEntity } from '../viewModel';
+ import { validations } from '../validations';
import { loginRequest } from './loginRequest';

const middlewares = [reduxThunk];
const getMockStore = configureStore(middlewares);

describe('login/actions/loginRequest tests', () => {
- it('should call to validateForm with loginEntity', () => {
+ it('should call to validateForm with loginEntity', (done) => {
    // Arrange
+   const loginEntity: LoginEntity = {
+     login: 'test login',
+     password: 'test password',
+   };

+   const validateFormStub = jest.spyOn(validations, 'validateForm');

    // Act
+   const store = getMockStore();
+   store.dispatch<any>(loginRequest(loginEntity))
+     .then(() => {
        // Assert
+       expect(validateFormStub).toHaveBeenCalledWith(loginEntity);
+       done();
+     });
  });
});
```

- Should call to mapLoginEntityVMToModel and login when formValidationResult.succeeded equals true:

### ./src/pages/login/actions/loginRequest.spec.ts
```diff
import configureStore from 'redux-mock-store';
import reduxThunk from 'redux-thunk';
import { LoginEntity } from '../viewModel';
import { validations } from '../validations';
+ import * as mappers from '../mappers';
+ import * as apiLogin from '../../../rest-api/api/login';
import { loginRequest } from './loginRequest';
...

+ it('should call to mapLoginEntityVMToModel and login when formValidationResult.succeeded equals true', (done) => {
+   // Arrange
+   const loginEntity: LoginEntity = {
+     login: 'test login',
+     password: 'test password',
+   };

+   const validateFormStub = jest.spyOn(validations, 'validateForm')
+     .mockResolvedValue({ succeeded: true });

+   const loginEntityModel = {
+     login: 'test login model',
+     password: 'test password model',
+   };
+   const mapLoginEntityVMToModelStub = jest.spyOn(mappers, 'mapLoginEntityVMToModel')
+     .mockReturnValue(loginEntityModel);

+   const loginStub = jest.spyOn(apiLogin, 'login');

+   // Act
+   const store = getMockStore();
+   store.dispatch<any>(loginRequest(loginEntity))
+     .then(() => {
+       // Assert
+       expect(mapLoginEntityVMToModelStub).toHaveBeenCalledWith(loginEntity);
+       expect(loginStub).toHaveBeenCalledWith(loginEntityModel);
+       done();
+     });
+ });
```

- Should call to history.push with members route when is successful login:

### ./src/pages/login/actions/loginRequest.spec.ts
```diff
...
import * as apiLogin from '../../../rest-api/api/login';
+ import { history } from '../../../history';
+ import { routes } from '../../../common/constants/routes';
import { loginRequest } from './loginRequest';
...

+ it('should call to history.push with members route when is successful login', (done) => {
+   // Arrange
+   const loginEntity: LoginEntity = {
+     login: 'test login',
+     password: 'test password',
+   };

+   const validateFormStub = jest.spyOn(validations, 'validateForm')
+     .mockResolvedValue({ succeeded: true });

+   const loginEntityModel = {
+     login: 'test login model',
+     password: 'test password model',
+   };
+   const mapLoginEntityVMToModelStub = jest.spyOn(mappers, 'mapLoginEntityVMToModel')
+     .mockReturnValue(loginEntityModel);

+   const loginStub = jest.spyOn(apiLogin, 'login')
+   .mockResolvedValue({});

+   const historyPushStub = jest.spyOn(history, 'push');
+   const logStub = jest.spyOn(window.console, 'log');

+   // Act
+   const store = getMockStore();
+   store.dispatch<any>(loginRequest(loginEntity))
+     .then(() => {
+       // Assert
+       expect(historyPushStub).toHaveBeenCalledWith(routes.members);
+       expect(logStub).not.toHaveBeenCalled();
+       done();
+     });
+ });
```

- Should call to console.log when is failed login:

### ./src/pages/login/actions/loginRequest.spec.ts
```diff
...

+ it('should call to console.log when is failed login', (done) => {
+   // Arrange
+   const loginEntity: LoginEntity = {
+     login: 'test login',
+     password: 'test password',
+   };

+   const validateFormStub = jest.spyOn(validations, 'validateForm')
+     .mockResolvedValue({ succeeded: true });

+   const loginEntityModel = {
+     login: 'test login model',
+     password: 'test password model',
+   };
+   const mapLoginEntityVMToModelStub = jest.spyOn(mappers, 'mapLoginEntityVMToModel')
+     .mockReturnValue(loginEntityModel);

+   const loginStub = jest.spyOn(apiLogin, 'login')
+   .mockRejectedValue('test error');

+   const historyPushStub = jest.spyOn(history, 'push');
+   const logStub = jest.spyOn(window.console, 'log');

+   // Act
+   const store = getMockStore();
+   store.dispatch<any>(loginRequest(loginEntity))
+     .then(() => {
+       // Assert
+       expect(historyPushStub).not.toHaveBeenCalled();
+       expect(logStub).toHaveBeenCalledWith('test error');
+       done();
+     });
+ });
```

- Why is it failing? If we run debugging, we will see that `then` method is executed before `catch`. To solve it, we could use `async/await`:

```diff
...
- it('should call to console.log when is failed login', (done) => {
+ it('should call to console.log when is failed login', async () => {
  ...

    // Act
    const store = getMockStore();
-   store.dispatch<any>(loginRequest(loginEntity))
-     .then(() => {
+   await store.dispatch<any>(loginRequest(loginEntity));
    // Assert
    expect(historyPushStub).not.toHaveBeenCalled();
    expect(logStub).toHaveBeenCalledWith('test error');
-       done();
-     });
 });
```

- Should dispatch `update login form errors` action:

### ./src/pages/login/actions/loginRequest.spec.ts
```diff
import configureStore from 'redux-mock-store';
import reduxThunk from 'redux-thunk';
+ import { FieldValidationResult } from 'lc-form-validation';
...
import { history } from '../../../history';
import { routes } from '../../../common/constants/routes';
+ import { actionIds } from './actionIds';
...

+ it(`should dispatch action with type UPDATE_LOGIN_FORM_ERRORS and payload with loginFormErrors
+ when formValidationResult.succeeded equals false and has fieldErrors`, (done) => {
+     // Arrange
+     const loginEntity: LoginEntity = {
+       login: 'test login',
+       password: 'test password',
+     };

+     const loginValidationResult = new FieldValidationResult();
+     loginValidationResult.key = 'login';
+     const passwordValidationResult = new FieldValidationResult();
+     passwordValidationResult.key = 'password';

+     const validateFormStub = jest.spyOn(validations, 'validateForm')
+       .mockResolvedValue({
+         succeeded: false,
+         fieldErrors: {
+           login: loginValidationResult,
+           password: passwordValidationResult,
+         },
+       });

+     // Act
+     const store = getMockStore();
+     store.dispatch<any>(loginRequest(loginEntity))
+       .then(() => {
+         // Assert
+         const expectedAction = store.getActions()[0];
+         expect(expectedAction.type).toEqual(actionIds.UPDATE_LOGIN_FORM_ERRORS);
+         expect(expectedAction.payload).toEqual(
+           {
+             login: loginValidationResult,
+             password: passwordValidationResult,
+           });
+         done();
+       });
+   });
```

- Finally, we are going to implement member list actions:

### ./src/pages/members/list/actions/actionIds.ts
```javascript
export const actionIds = {
  UPDATE_MEMBERS: 'UPDATE_MEMBERS',
};
```

- Implement the `completed` action:

### ./src/pages/members/list/actions/fetchMembers.ts
```javascript
import { actionIds } from './actionIds';
import { Member } from '../../../../rest-api/model';

const fetchMembersCompleted = (members: Member[]) => ({
  type: actionIds.UPDATE_MEMBERS,
  payload: members,
});
```

- Implement the `started` action:

### ./src/pages/members/list/actions/fetchMembers.ts
```diff
import { actionIds } from './actionIds';
import { Member } from '../../../../rest-api/model';
+ import * as apiMember from '../../../../rest-api/api/member';

+ export const fetchMembers = () => (dispatch) => (
+   apiMember.fetchMembers()
+     .then((members) => dispatch(fetchMembersCompleted(members)))
+     .catch(console.log)
+ );

const fetchMembersCompleted = (members: Member[]) => ({
  type: actionIds.UPDATE_MEMBERS,
  payload: members,
});
```

- Prepare the spec:

### ./src/pages/members/list/actions/fetchMembers.spec.ts
```javascript
import configureStore from 'redux-mock-store';
import reduxThunk from 'redux-thunk';
import { fetchMembers } from './fetchMembers';

const middlewares = [reduxThunk];
const getMockStore = configureStore(middlewares);

describe('members/list/actions/fetchMembers tests', () => {
  it('should call to apiMember.fetchMembers', () => {
    // Arrange

    // Act

    // Assert
  });
});
```

- Should call to apiMember.fetchMembers:

### ./src/pages/members/list/actions/fetchMembers.spec.ts
```diff
import configureStore from 'redux-mock-store';
import reduxThunk from 'redux-thunk';
+ import * as apiMember from '../../../../rest-api/api/member';
import { fetchMembers } from './fetchMembers';

const middlewares = [reduxThunk];
const getMockStore = configureStore(middlewares);

describe('members/list/actions/fetchMembers tests', () => {
- it('should call to apiMember.fetchMembers', () => {
+ it('should call to apiMember.fetchMembers', (done) => {
    // Arrange
+   const fetchMembersStub = jest.spyOn(apiMember, 'fetchMembers');

    // Act
+   const store = getMockStore();
+   store.dispatch<any>(fetchMembers())
+     .then(() => {
        // Assert
+       expect(fetchMembersStub).toHaveBeenCalled();
+       done();
+     });
  });
});
```

- Why was this test fail? Because jest is running over `Node` process and it doesn't have any fetch implementation. That means `spyOn` is not mocking the implementation, it's only adding a wrapper to know `calls method`:

> NOTE: instead of create an object with `then` and `catch` we could use `mockResolvedValue` and `mockRejectedValue`.

### ./src/pages/members/list/actions/fetchMembers.spec.ts
```diff
...
  it('should call to apiMember.fetchMembers', (done) => {
    // Arrange
-   const fetchMembersStub = jest.spyOn(apiMember, 'fetchMembers');
+   const fetchMembersStub = jest.spyOn(apiMember, 'fetchMembers')
+     .mockResolvedValue([]);

    // Act
    const store = getMockStore();
    store.dispatch<any>(fetchMembers())
      .then(() => {
        // Assert
        expect(fetchMembersStub).toHaveBeenCalled();
        done();
      });
  });
});
```

- Should dispatch `update members` action:

### ./src/pages/members/list/actions/fetchMembers.spec.ts
```diff
import configureStore from 'redux-mock-store';
import reduxThunk from 'redux-thunk';
import * as apiMember from '../../../../rest-api/api/member';
+ import { Member } from '../../../../rest-api/model';
+ import { actionIds } from './actionIds';
import { fetchMembers } from './fetchMembers';
...

+ it(`should dispatch action with type UPDATE_MEMBERS and payload with members
+ when it fetch members successfully`, (done) => {
+     // Arrange
+     const members: Member[] = [
+       {
+         id: 1,
+         login: 'test login',
+         avatar_url: 'test url',
+       },
+     ];

+     const fetchMembersStub = jest.spyOn(apiMember, 'fetchMembers')
+       .mockResolvedValue(members);

+     // Act
+     const store = getMockStore();
+     store.dispatch<any>(fetchMembers())
+       .then(() => {
+         // Assert
+         const expectedAction = store.getActions()[0];
+         expect(expectedAction.type).toEqual(actionIds.UPDATE_MEMBERS);
+         expect(expectedAction.payload).toEqual(members);
+         done();
+       });
+   });
```

- Should call `console.log` on fail request:

### ./src/pages/members/list/actions/fetchMembers.spec.ts
```diff
...

+ it('should call console.log when fail request', (done) => {
+   // Arrange
+   const error = 'test error';
+   const fetchMembersStub = jest.spyOn(apiMember, 'fetchMembers')
+     .mockRejectedValue(error);

+   const logStub = jest.spyOn(window.console, 'log');

+   // Act
+   const store = getMockStore();
+   store.dispatch<any>(fetchMembers())
+     .then(() => {
+       // Assert
+       expect(logStub).toHaveBeenCalledWith(error);
+       done();
+     });
+ });
```

# About Lemoncode

We are a team of long-term experienced freelance developers, established as a group in 2010.
We specialize in Front End technologies and .NET. [Click here](http://lemoncode.net/services/en/#en-home) to get more info about us.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
