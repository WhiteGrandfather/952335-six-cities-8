import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import {AppProps} from './types';
import MainPage from '../main-page/main-page';
import Login from '../login/login';
import Page404 from '../page-404/page404';
import Property from '../propery/property';
import PrivetRoute from '../privet-route/privet-route';

function App({placesNumber}: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <MainPage placesNumber={placesNumber}/>
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/favorites" exact>
          <PrivetRoute/>
        </Route>
        <Route path="/offer/:id?" exact>
          <Property/>
        </Route>
        <Route>
          <Page404/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
