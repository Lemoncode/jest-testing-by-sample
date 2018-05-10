import { FieldValidationResult } from 'lc-form-validation';
import configureStore from 'redux-mock-store';
import reduxThunk from 'redux-thunk';
import { actionIds } from './actionIds';
import { LoginEntity } from '../viewModel';
import { validations } from '../validations';
import { updateLoginEntityFieldCompleted, updateLoginEntityField } from './updateLoginEntityField';

const middlewares = [reduxThunk];
const getMockStore = configureStore(middlewares);

describe('login/actions/updateLoginEntityField tests', () => {
  describe('updateLoginEntityFieldCompleted', () => {
    it(`should return action with type UPDATE_LOGIN_ENTITY_FIELD and payload with values
    when passing fieldName, value and fieldValidationResult`, () => {
        // Arrange
        const fieldName = 'test fieldName';
        const value = 'test value';
        const fieldValidationResult = new FieldValidationResult();
        fieldValidationResult.succeeded = true;

        // Act
        const result = updateLoginEntityFieldCompleted(fieldName, value, fieldValidationResult);

        // Assert
        expect(result.type).toEqual(actionIds.UPDATE_LOGIN_ENTITY_FIELD);
        expect(result.payload).toEqual({
          fieldName,
          value,
          fieldValidationResult,
        });
      });
  });

  describe('updateLoginEntityField', () => {
    it('should call to validateField when passing loginEntity, fieldName and value', (done) => {
      // Arrange
      const loginEntity: LoginEntity = {
        login: 'test login',
        password: 'test password',
      };
      const fieldName = 'login';
      const value = 'updated login';

      const validateFieldStub = jest.spyOn(validations, 'validateField');

      // Act
      const store = getMockStore();
      store.dispatch<any>(updateLoginEntityField(loginEntity, fieldName, value))
      .then(() => {
        // Assert
        expect(validateFieldStub).toHaveBeenCalledWith(loginEntity, fieldName, value);
      })
      .then(done, done);
    });
  });
});
