import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import Favorites from '../favorites/favorites';

const loggedIn = false;

export default function PrivetRoute(): JSX.Element {
  return (
    <Route
      render={()=> loggedIn ? <Favorites/> : <Redirect to='/login'/>}
    />
  );
}
