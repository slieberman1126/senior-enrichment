import { render } from 'react-dom';
import Main from './components/Main';

import store from './store';
import React from 'react';

import { Provider } from 'react-redux';
render(
  <Provider store={store}>
    <Main />
  </Provider>,
  document.getElementById('root')
);
