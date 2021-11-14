import React from 'react';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import {Link} from 'react-router-dom';

import {
  APIRoute,
  AppRoute,
  AuthorizationStatus
} from '../../const';
import {
  getAuthInfo,
  getAuthorizationStatus
} from '../../store/user-process/selector';
import {HeaderProps} from './types';
import {logoutAction} from '../../services/api-actions';

function Header({ShowNav}: HeaderProps): JSX.Element {
  const {
    email,
    avatarUrl,
  } = useSelector(getAuthInfo);
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const dispatch = useDispatch();

  const isLogged = (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
            <div className="header__avatar-wrapper user__avatar-wrapper"
              style={{backgroundImage: `url(${avatarUrl})`}}
            />
            <span className="header__user-name user__name">
              {email}
            </span>
          </Link>
        </li>
        <li className="header__nav-item">
          <Link className="header__nav-link"
            to="/"
            onClick={()=> dispatch(logoutAction())}
          >
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

export default Header;
