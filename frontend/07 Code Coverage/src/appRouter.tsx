import * as React from 'react';
import { Router } from 'react-router';
import { history } from './history';
import { Routes } from './routes';

export const AppRouter: React.StatelessComponent = (props) => (
  <Router history={history} routes={Routes} />
);
