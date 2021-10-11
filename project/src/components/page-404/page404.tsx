import React from 'react';
import {Link} from 'react-router-dom';

import './page404.css';

export default function Page404(): JSX.Element {
  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to='/'>
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <div className="words">
              <span>4</span>
              <span>0</span>
              <span>4</span>
            </div>
            <h1 className="login__title">
              Oooops!<br/>
              Page not found<br/>
            </h1>

            <Link className="login__submit form__submit button" to="/">
              Go to main page
            </Link>
          </section>
        </div>
      </main>
    </div>
  );
}
