import React from 'react';
import {
  Route,
  Redirect
} from 'react-router-dom';
import {useSelector} from 'react-redux';

import {AuthorizationStatus} from '../../const';
import Favorites from '../favorites/favorites';
import {getAuthorizationStatus} from '../../store/user-process/selector';

export function PrivetRoute(): JSX.Element {
  const authorizationStatus = useSelector(getAuthorizationStatus);

  const isLoggedIn: boolean = authorizationStatus === AuthorizationStatus.Auth;

  return (
    <Route
      render={()=> isLoggedIn ? <Favorites/> : <Redirect to='/login'/>}
    />
  );
}

export default PrivetRoute;
