import * as React from 'react';
import { history } from '../../history';
import {
  LoginEntity, createEmptyLoginEntity,
  LoginFormErrors, createEmptyLoginFormErrors,
} from './viewModel';
import { validations } from './validations';
import { LoginPage } from './page';
import { routes } from '../../common/constants/routes';

interface State {
  loginEntity: LoginEntity;
  loginFormErrors: LoginFormErrors;
}

export class LoginPageContainer extends React.PureComponent<{}, State> {
  state = {
    loginEntity: createEmptyLoginEntity(),
    loginFormErrors: createEmptyLoginFormErrors(),
  };

  updateField = (fieldName: string, value: any) => {
    validations.validateField(this.state.loginEntity, fieldName, value)
      .then((fieldValidationResult) => {
        this.setState({
          loginEntity: {
            ...this.state.loginEntity,
            [fieldName]: value,
          },
          loginFormErrors: {
            ...this.state.loginFormErrors,
            [fieldName]: fieldValidationResult,
          },
        });
      });
  }

  doLogin = () => {
    validations.validateForm(this.state.loginEntity)
      .then((formValidationResult) => {
        if (formValidationResult.succeeded) {
          history.push(routes.members);
        } else {
          alert('error, review the fields');
        }
      });
  }

  render() {
    return (
      <LoginPage
        loginEntity={this.state.loginEntity}
        loginFormErrors={this.state.loginFormErrors}
        updateField={this.updateField}
        doLogin={this.doLogin}
      />
    );
  }
}
