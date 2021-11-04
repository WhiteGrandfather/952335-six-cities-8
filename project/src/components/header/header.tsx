import React from 'react';
import {
  connect,
  ConnectedProps
} from 'react-redux';
import {Link} from 'react-router-dom';

import {
  APIRoute,
  AuthorizationStatus
} from '../../const';
import {HeaderProps} from './types';
import {State} from '../../types/state';

//Подготавливает типы для props из Redux store
const mapStateToProps = ({authorizationStatus}: State) => ({authorizationStatus});

//Создает константу connector для подключения props из Redux в компонент
const connector = connect(mapStateToProps);

// Подготавливает типы props для компонента
type PropsFromRedux = HeaderProps & ConnectedProps<typeof connector>;

function Header({ShowNav, authorizationStatus}: PropsFromRedux): JSX.Element {

  const isLogged = (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <a className="header__nav-link header__nav-link--profile" href="#">
            <div className="header__avatar-wrapper user__avatar-wrapper">
            </div>
            <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
          </a>
        </li>
        <li className="header__nav-item">
          <Link className="header__nav-link" to="/">
            <span className="header__signout">Sign out</span>
          </Link>
        </li>
      </ul>
    </nav>
  );

  const notLogged = (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link className="header__nav-link header__nav-link--profile" to={APIRoute.Login}>
            <div className="header__avatar-wrapper user__avatar-wrapper">
            </div>
            <span className="header__login">Sign in</span>
          </Link>
        </li>
      </ul>
    </nav>
  );

  const renderNav = authorizationStatus === AuthorizationStatus.Auth
    ? isLogged
    : notLogged;

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link" to={'/'}>
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
            </Link>
          </div>
          {ShowNav? renderNav : '' }
        </div>
      </div>
    </header>
  );
}

export {Header};
export default connector(Header);
