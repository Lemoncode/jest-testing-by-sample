import * as React from 'react';
import { FormProps } from './formProps';
import { Input } from '../../../common/components/form';

export const Form: React.StatelessComponent<FormProps> = (props) => (
  <form role="form">
    <fieldset>
      <Input
        name="login"
        label="login"
        onChange={props.updateField}
        placeholder="E-mail"
        value={props.loginEntity.login}
        error={props.loginFormErrors.login.errorMessage}
      />
      <Input
        name="password"
        label="password"
        onChange={props.updateField}
        placeholder="password"
        value={props.loginEntity.password}
        error={props.loginFormErrors.password.errorMessage}
        type="password"
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
