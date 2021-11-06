import React from 'react';
import {
  Route,
  Redirect
} from 'react-router-dom';
import {
  connect,
  ConnectedProps
} from 'react-redux';

import {AuthorizationStatus} from '../../const';
import Favorites from '../favorites/favorites';
import {State} from '../../types/state';

//Подготавливает типы для props из Redux store
const mapStateToProps = ({authorizationStatus}: State) => ({authorizationStatus});

//Создает константу connector для подключения props из Redux в компонент
const connector = connect(mapStateToProps);

// Подготавливает типы props для компонента
type PropsFromRedux = ConnectedProps<typeof connector>;

export function PrivetRoute({authorizationStatus}: PropsFromRedux): JSX.Element {

  const isLoggedIn: boolean = authorizationStatus === AuthorizationStatus.Auth;

  return (
    <Route
      render={()=> isLoggedIn ? <Favorites/> : <Redirect to='/login'/>}
    />
  );
}

export default connector(PrivetRoute);
