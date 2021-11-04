import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
import {connect, ConnectedProps} from 'react-redux';

import {
  AppRoute,
  AuthorizationStatus
} from '../../const';
import MainPage from '../main-page/main-page';
import Login from '../login/login';
import Page404 from '../page-404/page404';
import Property from '../propery/property';
import PrivetRoute from '../privet-route/privet-route';

import type {State} from '../../types/state';
import LoadingScreen from '../loading-screen/loading-screen';

const mapStateToProps = ({authorizationStatus, isDataLoaded}: State)=> ({
  authorizationStatus,
  isDataLoaded,
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

function App(props: PropsFromRedux): JSX.Element {
  const {authorizationStatus, isDataLoaded} = props;

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
          <Property
            isLoggedIn={isDataLoaded}
          />
        </Route>
        <Route>
          <Page404/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export {App};
export default connector(App);
