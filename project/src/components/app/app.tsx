import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';

import {AppRoute} from '../../const';
import MainPage from '../main-page/main-page';
import Login from '../login/login';
import Page404 from '../page-404/page404';
import Property from '../propery/property';
import PrivetRoute from '../privet-route/privet-route';

import type {
  loggedType
} from './types';

export default function App(): JSX.Element {
  const isLoggedIn: loggedType = true;

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.Root}>
          <MainPage />
        </Route>
        <Route exact path={AppRoute.Login}>
          <Login />
        </Route>
        <Route exact path={AppRoute.Favorites}>
          <PrivetRoute
            isLoggedIn={isLoggedIn}
          />
        </Route>
        <Route exact path={AppRoute.Property}>
          <Property
            isLoggedIn={isLoggedIn}
          />
        </Route>
        <Route>
          <Page404/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
