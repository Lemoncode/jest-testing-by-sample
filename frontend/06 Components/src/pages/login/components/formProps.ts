import { LoginEntity, LoginFormErrors } from '../viewModel';

export interface FormProps {
  loginEntity: LoginEntity;
  loginFormErrors: LoginFormErrors;
  updateField: (field: string, value: any) => void;
  doLogin: () => void;
}
