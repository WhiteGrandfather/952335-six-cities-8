import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
import {useSelector} from 'react-redux';

import {
  AppRoute,
  AuthorizationStatus
} from '../../const';
import {
  getAuthorizationStatus,
  getIsDataLoaded
} from '../../store/user-process/selector';
import Login from '../login/login';
import MainPage from '../main-page/main-page';
import Page404 from '../page-404/page404';
import Property from '../propery/property';
import PrivetRoute from '../privet-route/privet-route';
import LoadingScreen from '../loading-screen/loading-screen';

import 'react-toastify/dist/ReactToastify.css';

function App(): JSX.Element {
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const isDataLoaded = useSelector(getIsDataLoaded);

  if (authorizationStatus === AuthorizationStatus.Unknown || !isDataLoaded) {
    return <LoadingScreen/>;
  }

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
          <PrivetRoute/>
        </Route>
        <Route exact path={AppRoute.Property}>
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
