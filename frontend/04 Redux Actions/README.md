# 04 Redux Actions

In this sample we are going to testing Redux actions.

We will start from sample _03 Debugging Jest_.

Summary steps:
 - Create login actions.
 - Add unit tests to login actions.

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
+ import { FieldValidationResult } from 'lc-form-validation';
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

- Should return action with values provided:

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

- We need mock the `redux-thunk` and `store` config:

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
+   it('should call to validateField when passing loginEntity, fieldName and value', () => {
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

### ./src/pages/login/actions/updateLoginEntityField.spec.ts
```diff
...
  describe('updateLoginEntityField', () => {
-   it('should call to validateField when passing loginEntity, fieldName and value', () => {
+   it('should call to validateField when passing loginEntity, fieldName and value', (done) => {
 ...
      // Act
      const store = getMockStore();
      store.dispatch<any>(updateLoginEntityField(loginEntity, fieldName, value))
+     .then(() => {
        // Assert
++       expect(validateFieldStub).toHaveBeenCalledWith(loginEntity, fieldName, value);
+     })
+     .then(done, done);
    });
  });
});

```

# About Lemoncode

We are a team of long-term experienced freelance developers, established as a group in 2010.
We specialize in Front End technologies and .NET. [Click here](http://lemoncode.net/services/en/#en-home) to get more info about us.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
