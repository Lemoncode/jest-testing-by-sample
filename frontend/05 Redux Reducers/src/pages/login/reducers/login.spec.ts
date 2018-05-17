import { loginReducer } from './login';
import { FieldValidationResult } from 'lc-form-validation';

describe('login/reducers/loginReducer tests', () => {
  it('should return initial state when passing undefined state and some action type', () => {
    // Arrange
    const initialState = undefined;
    const action = { type: 'some type' };

    // Act
    const nextState = loginReducer(initialState, action);

    // Assert
    expect(nextState.loginEntity.login).toEqual('');
    expect(nextState.loginEntity.password).toEqual('');
    expect(nextState.loginFormErrors.login).toEqual(new FieldValidationResult());
    expect(nextState.loginFormErrors.password).toEqual(new FieldValidationResult());
  });
});
