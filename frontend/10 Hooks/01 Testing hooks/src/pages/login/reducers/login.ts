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
  switch (action.type) {
    case actionIds.UPDATE_LOGIN_ENTITY_FIELD:
      return handleUpdateLoginEntityField(state, action.payload);

    case actionIds.UPDATE_LOGIN_FORM_ERRORS:
      return handleUpdateLoginFormErrors(state, action.payload);
  }

  return state;
};

const handleUpdateLoginEntityField = (state: LoginState, { fieldName, value, fieldValidationResult }): LoginState => ({
  loginEntity: {
    ...state.loginEntity,
    [fieldName]: value,
  },
  loginFormErrors: {
    ...state.loginFormErrors,
    [fieldName]: fieldValidationResult,
  },
});

const handleUpdateLoginFormErrors = (state: LoginState, loginFormErrors: LoginFormErrors): LoginState => ({
  ...state,
  loginFormErrors,
});
