import configureStore from 'redux-mock-store';
import reduxThunk from 'redux-thunk';
import { FieldValidationResult } from 'lc-form-validation';
import { LoginEntity } from '../viewModel';
import { validations } from '../validations';
import * as mappers from '../mappers';
import * as apiLogin from '../../../rest-api/api/login';
import { history } from '../../../history';
import { routes } from '../../../common/constants/routes';
import { actionIds } from './actionIds';
import { loginRequest } from './loginRequest';

const middlewares = [reduxThunk];
const getMockStore = configureStore(middlewares);

describe('login/actions/loginRequest tests', () => {
  it('should call to validateForm with loginEntity', (done) => {
    // Arrange
    const loginEntity: LoginEntity = {
      login: 'test login',
      password: 'test password',
    };

    const validateFormStub = jest.spyOn(validations, 'validateForm');

    // Act
    const store = getMockStore();
    store.dispatch<any>(loginRequest(loginEntity))
      .then(() => {
        // Assert
        expect(validateFormStub).toHaveBeenCalledWith(loginEntity);
        done();
      });
  });

  it('should call to mapLoginEntityVMToModel and login when formValidationResult.succeeded equals true', (done) => {
    // Arrange
    const loginEntity: LoginEntity = {
      login: 'test login',
      password: 'test password',
    };

    const validateFormStub = jest.spyOn(validations, 'validateForm')
      .mockImplementation(() => ({
        then: function(callback) {
          callback({ succeeded: true });
          return this;
        },
      }));

    const loginEntityModel = {
      login: 'test login model',
      password: 'test password model',
    };
    const mapLoginEntityVMToModelStub = jest.spyOn(mappers, 'mapLoginEntityVMToModel')
      .mockImplementation(() => loginEntityModel);

    const loginStub = jest.spyOn(apiLogin, 'login');

    // Act
    const store = getMockStore();
    store.dispatch<any>(loginRequest(loginEntity))
      .then(() => {
        // Assert
        expect(mapLoginEntityVMToModelStub).toHaveBeenCalledWith(loginEntity);
        expect(loginStub).toHaveBeenCalledWith(loginEntityModel);
        done();
      });
  });

  it('should call to history.push with members route when is successful login', (done) => {
    // Arrange
    const loginEntity: LoginEntity = {
      login: 'test login',
      password: 'test password',
    };

    const validateFormStub = jest.spyOn(validations, 'validateForm')
      .mockImplementation(() => ({
        then: function(callback) {
          callback({ succeeded: true });
          return this;
        },
      }));

    const loginEntityModel = {
      login: 'test login model',
      password: 'test password model',
    };
    const mapLoginEntityVMToModelStub = jest.spyOn(mappers, 'mapLoginEntityVMToModel')
      .mockImplementation(() => loginEntityModel);

    const loginStub = jest.spyOn(apiLogin, 'login')
      .mockImplementation(() => ({
        then: function(callback) {
          callback();
          return this;
        },
        catch: function(callback) {
          return this;
        },
      }));

    const historyPushStub = jest.spyOn(history, 'push');
    const logStub = jest.spyOn(window.console, 'log');

    // Act
    const store = getMockStore();
    store.dispatch<any>(loginRequest(loginEntity))
      .then(() => {
        // Assert
        expect(historyPushStub).toHaveBeenCalledWith(routes.members);
        expect(logStub).not.toHaveBeenCalled();
        done();
      });
  });

  it('should call to console.log when is failed login', (done) => {
    // Arrange
    const loginEntity: LoginEntity = {
      login: 'test login',
      password: 'test password',
    };

    const validateFormStub = jest.spyOn(validations, 'validateForm')
      .mockImplementation(() => ({
        then: function(callback) {
          callback({ succeeded: true });
          return this;
        },
      }));

    const loginEntityModel = {
      login: 'test login model',
      password: 'test password model',
    };
    const mapLoginEntityVMToModelStub = jest.spyOn(mappers, 'mapLoginEntityVMToModel')
      .mockImplementation(() => loginEntityModel);

    const loginStub = jest.spyOn(apiLogin, 'login')
      .mockImplementation(() => ({
        then: function(callback) {
          return this;
        },
        catch: function(callback) {
          callback('test error');
          return this;
        },
      }));

    const historyPushStub = jest.spyOn(history, 'push');
    const logStub = jest.spyOn(window.console, 'log');

    // Act
    const store = getMockStore();
    store.dispatch<any>(loginRequest(loginEntity))
      .then(() => {
        // Assert
        expect(historyPushStub).not.toHaveBeenCalled();
        expect(logStub).toHaveBeenCalledWith('test error');
        done();
      });
  });

  it(`should dispatch action with type UPDATE_LOGIN_FORM_ERRORS and payload with loginFormErrors
  when formValidationResult.succeeded equals false and has fieldErrors`, (done) => {
      // Arrange
      const loginEntity: LoginEntity = {
        login: 'test login',
        password: 'test password',
      };

      const loginValidationResult = new FieldValidationResult();
      loginValidationResult.key = 'login';
      const passwordValidationResult = new FieldValidationResult();
      passwordValidationResult.key = 'password';

      const validateFormStub = jest.spyOn(validations, 'validateForm')
        .mockImplementation(() => ({
          then: function(callback) {
            callback({
              succeeded: false,
              fieldErrors: [
                loginValidationResult,
                passwordValidationResult,
              ],
            });
            return this;
          },
        }));

      // Act
      const store = getMockStore();
      store.dispatch<any>(loginRequest(loginEntity))
        .then(() => {
          // Assert
          const expectedAction = store.getActions()[0];
          expect(expectedAction.type).toEqual(actionIds.UPDATE_LOGIN_FORM_ERRORS);
          expect(expectedAction.payload).toEqual(
            {
              login: loginValidationResult,
              password: passwordValidationResult,
            });
          done();
        });
    });
});
