import * as React from 'react';
import { Route, IndexRoute } from 'react-router';
import { routes } from './common/constants/routes';
import { App } from './app';
import { LoginPageContainer, MemberListPageContainer } from './pages';

export const Routes = (
  <Route path={routes.default} component={App}>
    <IndexRoute component={LoginPageContainer} />
    <Route path={routes.members} component={MemberListPageContainer} />
  </Route>
);
