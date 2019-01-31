import * as React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { State } from '../reducers';
import { createEmptyLoginFormErrors, createEmptyLoginEntity } from './viewModel';
import * as updateFieldActions from './actions/updateLoginEntityField';
import * as loginRequestActions from './actions/loginRequest';
import { LoginPageContainer } from './pageContainer';

const getMockStore = configureStore();

describe('pages/login/pageContainer tests', () => {
  it('should render as expected passing state', () => {
    // Arrange
    const state = {
      login: {
        loginEntity: createEmptyLoginEntity(),
        loginFormErrors: createEmptyLoginFormErrors(),
      },
    } as State;

    const store = getMockStore(state);

    // Act
    const component = shallow(
      <LoginPageContainer
      />,
      {
        context: { store },
      }
    );

    // Assert
    expect(component).toMatchSnapshot();
  });

  it('should call to updateLoginEntityField action creator when call to updateField prop', () => {
    // Arrange
    const state = {
      login: {
        loginEntity: createEmptyLoginEntity(),
        loginFormErrors: createEmptyLoginFormErrors(),
      },
    } as State;

    const store = getMockStore(state);
    const actionCreatorStub = jest.spyOn(updateFieldActions, 'updateLoginEntityField')
      .mockImplementation(() => ({
        type: 'test action type',
      }));

    // Act
    const component = shallow(
      <LoginPageContainer
      />,
      {
        context: { store },
      }
    );

    component.prop('updateField')('test fieldName', 'test value');

    // Assert
    expect(actionCreatorStub).toHaveBeenCalledWith(state.login.loginEntity, 'test fieldName', 'test value');
  });

  it('should call to loginRequest action creator when call to doLogin prop', () => {
    // Arrange
    const state = {
      login: {
        loginEntity: createEmptyLoginEntity(),
        loginFormErrors: createEmptyLoginFormErrors(),
      },
    } as State;

    const store = getMockStore(state);
    const actionCreatorStub = jest.spyOn(loginRequestActions, 'loginRequest')
      .mockImplementation(() => ({
        type: 'test action type',
      }));

    // Act
    const component = shallow(
      <LoginPageContainer
      />,
      {
        context: { store },
      }
    );

    component.prop('doLogin')();

    // Assert
    expect(actionCreatorStub).toHaveBeenCalledWith(state.login.loginEntity);
  });
});
