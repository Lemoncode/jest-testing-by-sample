import { State } from '../src/pages/reducers';
import { createEmptyLoginEntity, createEmptyLoginFormErrors } from '../src/pages/login/viewModel';

export const mockInitialState = (): State => ({
  login: {
    loginEntity: createEmptyLoginEntity(),
    loginFormErrors: createEmptyLoginFormErrors(),
  },
  members: [],
});
