import * as React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { AppRouter } from './appRouter';

export const AppProvider: React.StatelessComponent = (props) => (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);
