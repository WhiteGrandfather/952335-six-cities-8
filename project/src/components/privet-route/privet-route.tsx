import React from 'react';
import {
  Route,
  Redirect } from 'react-router-dom';

import Favorites from '../favorites/favorites';
import type {PrivetRouteProps} from './types';

export default function PrivetRoute({
  isLoggedIn,
}: PrivetRouteProps): JSX.Element {

  return (
    <Route
      render={()=> isLoggedIn ? <Favorites/> : <Redirect to='/login'/>}
    />
  );
}
