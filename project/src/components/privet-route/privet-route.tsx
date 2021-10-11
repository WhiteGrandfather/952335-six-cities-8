import React from 'react';
import {Route, Redirect} from 'react-router-dom';

import Favorites from '../favorites/favorites';
import type {loggedType} from './types';

const isLoggedIn: loggedType = false;

export default function PrivetRoute(): JSX.Element {
  return (
    <Route
      render={()=> isLoggedIn ? <Favorites/> : <Redirect to='/login'/>}
    />
  );
}
