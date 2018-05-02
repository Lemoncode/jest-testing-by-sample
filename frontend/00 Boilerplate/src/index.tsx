import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { AppRouter } from './appRouter';

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root'),
  );
};

render(AppRouter);

if (module.hot) {
  module.hot.accept('./appRouter', () => {
    render(AppRouter);
  });
}
