import * as React from 'react';
import { FormProps } from './formProps';
import { Input } from '../../../common/components/form';

export const Form: React.StatelessComponent<FormProps> = (props) => (
  <form role="form">
    <fieldset>
      <Input
        name="login"
        label="Login"
        onChange={props.updateField}
        placeholder="E-mail"
        value={props.loginEntity.login}
        error={props.loginFormErrors.login.errorMessage}
      />
      <Input
        type="password"
        name="password"
        label="Password"
        onChange={props.updateField}
        placeholder="password"
        value={props.loginEntity.password}
        error={props.loginFormErrors.password.errorMessage}
      />
      <button
        type="button"
        className="btn btn-lg btn-success btn-block"
        onClick={props.doLogin}
      >
        Login
      </button>
    </fieldset>
  </form>
);
