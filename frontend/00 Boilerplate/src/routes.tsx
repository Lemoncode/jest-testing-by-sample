import * as React from 'react';
import { Route, IndexRoute } from 'react-router';
import { routes } from './common/constants/routes';
import { App } from './app';

const Test = () => <h1>Test component</h1>;

export const Routes = (
  <Route path={routes.default} component={App}>
    <IndexRoute component={Test} />
  </Route>
);
