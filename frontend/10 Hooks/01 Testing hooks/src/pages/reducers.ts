import { combineReducers } from 'redux';
import { loginReducer, LoginState } from './login';
import { membersReducer, MembersState } from './members/list';

export interface State {
  login: LoginState;
  members: MembersState;
}

export const reducers = combineReducers<State>({
  login: loginReducer,
  members: membersReducer,
});
