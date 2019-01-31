import { FieldValidationResult } from 'lc-form-validation';
import { actionIds } from './actionIds';
import { validations } from '../validations';
import { LoginEntity } from '../viewModel';

export const updateLoginEntityField = (loginEntity: LoginEntity, fieldName: string, value: any) => (dispatch) =>
  validations.validateField(loginEntity, fieldName, value)
    .then((fieldValidationResult) => {
      dispatch(updateLoginEntityFieldCompleted(fieldName, value, fieldValidationResult));
    });

export const updateLoginEntityFieldCompleted =
  (fieldName: string, value: any, fieldValidationResult: FieldValidationResult) => ({
    type: actionIds.UPDATE_LOGIN_ENTITY_FIELD,
    payload: {
      fieldName,
      value,
      fieldValidationResult,
    },
  });
