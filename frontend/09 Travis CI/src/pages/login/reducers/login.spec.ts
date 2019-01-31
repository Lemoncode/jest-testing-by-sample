import { FieldValidationResult } from 'lc-form-validation';
import deepFreeze from 'deep-freeze';
import { actionIds } from '../actions/actionIds';
import { LoginFormErrors } from '../viewModel';
import { loginReducer, LoginState } from './login';

describe('login/reducers/loginReducer tests', () => {
  it('should return initial state when passing undefined state and some action type', () => {
    // Arrange
    const state = undefined;
    const action = { type: 'some type' };

    // Act
    const nextState = loginReducer(state, action);

    // Assert
    expect(nextState.loginEntity.login).toEqual('');
    expect(nextState.loginEntity.password).toEqual('');
    expect(nextState.loginFormErrors.login).toEqual(new FieldValidationResult());
    expect(nextState.loginFormErrors.password).toEqual(new FieldValidationResult());
  });

  it('should return same state without mutate it when passing state and some action type', () => {
    // Arrange
    const state: LoginState = {
      loginEntity: {
        login: 'test login',
        password: 'test password',
      },
      loginFormErrors: {
        login: new FieldValidationResult(),
        password: new FieldValidationResult(),
      },
    };
    const action = { type: 'some type' };
    deepFreeze(state);

    // Act
    const nextState = loginReducer(state, action);

    // Assert
    expect(nextState.loginEntity.login).toEqual('test login');
    expect(nextState.loginEntity.password).toEqual('test password');
    expect(nextState.loginFormErrors.login).toEqual(new FieldValidationResult());
    expect(nextState.loginFormErrors.password).toEqual(new FieldValidationResult());
  });

  it(`should return updated state without mutate it
  when passing state, UPDATE_LOGIN_ENTITY_FIELD action type and login field payload`, () => {
      // Arrange
      const state: LoginState = {
        loginEntity: {
          login: 'test login',
          password: 'test password',
        },
        loginFormErrors: {
          login: new FieldValidationResult(),
          password: new FieldValidationResult(),
        },
      };

      const action = {
        type: actionIds.UPDATE_LOGIN_ENTITY_FIELD,
        payload: {
          fieldName: 'login',
          value: '',
          fieldValidationResult: {
            succeeded: false,
            errorMessage: 'test message',
          } as FieldValidationResult,
        },
      };

      deepFreeze(state);

      // Act
      const nextState = loginReducer(state, action);

      // Assert
      expect(nextState.loginEntity.login).toEqual('');
      expect(nextState.loginEntity.password).toEqual('test password');
      expect(nextState.loginFormErrors.login).toEqual({
        errorMessage: 'test message',
        succeeded: false,
      } as FieldValidationResult);
      expect(nextState.loginFormErrors.password).toEqual(new FieldValidationResult());
    });

  it(`should return updated state without mutate it
  when passing state, UPDATE_LOGIN_ENTITY_FIELD action type and password field payload`, () => {
      // Arrange
      const state: LoginState = {
        loginEntity: {
          login: 'test login',
          password: 'test password',
        },
        loginFormErrors: {
          login: new FieldValidationResult(),
          password: new FieldValidationResult(),
        },
      };

      const action = {
        type: actionIds.UPDATE_LOGIN_ENTITY_FIELD,
        payload: {
          fieldName: 'password',
          value: 'updated password',
          fieldValidationResult: {
            succeeded: true,
            errorMessage: '',
          } as FieldValidationResult,
        },
      };

      deepFreeze(state);

      // Act
      const nextState = loginReducer(state, action);

      // Assert
      expect(nextState.loginEntity.login).toEqual('test login');
      expect(nextState.loginEntity.password).toEqual('updated password');
      expect(nextState.loginFormErrors.login).toEqual(new FieldValidationResult());
      expect(nextState.loginFormErrors.password).toEqual({
        errorMessage: '',
        succeeded: true,
      } as FieldValidationResult);
    });

  it(`should return updated state without mutate it
  when passing state, UPDATE_LOGIN_FORM_ERRORS action type and loginFormErrors payload`, () => {
      // Arrange
      const state: LoginState = {
        loginEntity: {
          login: 'test login',
          password: 'test password',
        },
        loginFormErrors: {
          login: new FieldValidationResult(),
          password: new FieldValidationResult(),
        },
      };

      const action = {
        type: actionIds.UPDATE_LOGIN_FORM_ERRORS,
        payload: {
          login: { succeeded: false, errorMessage: 'test login message' },
          password: { succeeded: false, errorMessage: 'test password message' },
        } as LoginFormErrors,
      };

      deepFreeze(state);

      // Act
      const nextState = loginReducer(state, action);

      // Assert
      expect(nextState.loginEntity.login).toEqual('test login');
      expect(nextState.loginEntity.password).toEqual('test password');
      expect(nextState.loginFormErrors.login).toEqual({
        errorMessage: 'test login message',
        succeeded: false,
      } as FieldValidationResult);
      expect(nextState.loginFormErrors.password).toEqual({
        errorMessage: 'test password message',
        succeeded: false,
      } as FieldValidationResult);
    });
});
