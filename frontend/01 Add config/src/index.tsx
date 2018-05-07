import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { AppProvider } from './appProvider';

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root'),
  );
};

render(AppProvider);

if (module.hot) {
  module.hot.accept('./appProvider', () => {
    render(AppProvider);
  });
}
