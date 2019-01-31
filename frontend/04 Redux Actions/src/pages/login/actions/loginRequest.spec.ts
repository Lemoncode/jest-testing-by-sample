import configureStore from 'redux-mock-store';
import reduxThunk from 'redux-thunk';
import { FieldValidationResult } from 'lc-form-validation';
import { LoginEntity } from '../viewModel';
import { validations } from '../validations';
import * as mappers from '../mappers';
import * as apiLogin from '../../../rest-api/api/login';
import { history } from '../../../history';
import { routes } from '../../../common/constants/routes';
import { loginRequest } from './loginRequest';
import { actionIds } from './actionIds';

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
      .mockResolvedValue({ succeeded: true });

    const loginEntityModel = {
      login: 'test login model',
      password: 'test password model',
    };
    const mapLoginEntityVMToModelStub = jest.spyOn(mappers, 'mapLoginEntityVMToModel')
      .mockReturnValue(loginEntityModel);

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
      .mockResolvedValue({ succeeded: true });

    const loginEntityModel = {
      login: 'test login model',
      password: 'test password model',
    };
    const mapLoginEntityVMToModelStub = jest.spyOn(mappers, 'mapLoginEntityVMToModel')
      .mockReturnValue(loginEntityModel);

    const loginStub = jest.spyOn(apiLogin, 'login')
      .mockResolvedValue({});

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

  it('should call to console.log when is failed login', async () => {
    // Arrange
    const loginEntity: LoginEntity = {
      login: 'test login',
      password: 'test password',
    };

    const validateFormStub = jest.spyOn(validations, 'validateForm')
      .mockResolvedValue({ succeeded: true });

    const loginEntityModel = {
      login: 'test login model',
      password: 'test password model',
    };
    const mapLoginEntityVMToModelStub = jest.spyOn(mappers, 'mapLoginEntityVMToModel')
      .mockReturnValue(loginEntityModel);

    const loginStub = jest.spyOn(apiLogin, 'login')
      .mockRejectedValue('test error');

    const historyPushStub = jest.spyOn(history, 'push');
    const logStub = jest.spyOn(window.console, 'log');

    // Act
    const store = getMockStore();
    await store.dispatch<any>(loginRequest(loginEntity));

    // Assert
    expect(historyPushStub).not.toHaveBeenCalled();
    expect(logStub).toHaveBeenCalledWith('test error');
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
        .mockResolvedValue({
          succeeded: false,
          fieldErrors: {
            login: loginValidationResult,
            password: passwordValidationResult,
          },
        });

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
