import React from 'react';
import ReactDOM from 'react-dom';
import {configureStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';

import App from './components/app/app';
import {AuthorizationStatus} from './const';
import {createAPI} from './services/api';
import {rootReducer} from './store/root-reducer';
import {requireAuthorisation} from './store/action';
import {ThunkAppDispatch} from './types/action';
import {
  checkAuthAction,
  fetchOffersAction
} from './services/api-actions';
import browserHistory from './browser-history';

const api = createAPI(
  () => store.dispatch(requireAuthorisation(AuthorizationStatus.NoAuth)),
);

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

(store.dispatch as ThunkAppDispatch)(checkAuthAction());
(store.dispatch as ThunkAppDispatch)(fetchOffersAction());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router history={browserHistory}>
        <App/>
      </Router>
    </Provider>
  </React.StrictMode>,

  document.getElementById('root'));
