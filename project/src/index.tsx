import React from 'react';
import ReactDOM from 'react-dom';
import {
  createStore,
  applyMiddleware
} from '@reduxjs/toolkit';
import {composeWithDevTools} from 'redux-devtools-extension';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import App from './components/app/app';
import {AuthorizationStatus} from './const';
import {createAPI} from './services/api';
import {reducer} from './store/reducer';
import {requireAuthorisation} from './store/action';
import {ThunkAppDispatch} from './types/action';
import {checkAuthAction, fetchOffersAction} from './services/api-actions';

const api = createAPI(
  () => store.dispatch(requireAuthorisation(AuthorizationStatus.NoAuth)),
);

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument(api)),
  ),
);

(store.dispatch as ThunkAppDispatch)(checkAuthAction());
(store.dispatch as ThunkAppDispatch)(fetchOffersAction());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>,

  document.getElementById('root'));
