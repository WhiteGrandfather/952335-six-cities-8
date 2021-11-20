import React from 'react';
import {Link} from 'react-router-dom';

import './page404.css';
import Header from '../header/header';

export default function Page404(): JSX.Element {
  return (
    <div className="page page--gray page--login" data-testid="page404">

      <Header ShowNav={false}/>

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
