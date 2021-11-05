import React, {
  FormEvent,
  useRef
} from 'react';
import {
  connect,
  ConnectedProps
} from 'react-redux';
import {useHistory, Redirect, Link} from 'react-router-dom';


import {ThunkAppDispatch} from '../../types/action';
import {AuthData} from '../../types/auth-data';
import {loginAction} from '../../services/api-actions';
import {ToastContainer} from 'react-toastify';
import {AppRoute, AuthorizationStatus} from '../../const';
import {State} from '../../types/state';
import Header from '../header/header';

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  onSubmit(authData: AuthData) {
    dispatch(loginAction(authData));
  },
});


const mapStateToProps = ({authorizationStatus}: State)=> ({
  authorizationStatus,
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

function Login({onSubmit, authorizationStatus}: PropsFromRedux): JSX.Element {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const history = useHistory();

  function submit(evt : FormEvent< HTMLFormElement>): void {
    evt.preventDefault();
    if (loginRef.current !== null && passwordRef.current !== null) {
      onSubmit({
        login: loginRef.current.value,
        password: passwordRef.current.value,
      });
    }

  }

  if (authorizationStatus === AuthorizationStatus.Auth) {
    history.push(AppRoute.Root);
    return (
      <Redirect to={AppRoute.Root} />
    );
  }

  return (
    <div className="page page--gray page--login">

      <Header ShowNav={false} />

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form"
              onSubmit={submit}
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input className="login__input form__input"
                  ref={loginRef}
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input className="login__input form__input"
                  ref={passwordRef}
                  type="password" name="password"
                  placeholder="Password"
                  required
                />
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to="/" >
                <span>Amsterdam</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
      <ToastContainer/>
    </div>
  );
}

export {Login};
export default connector(Login);
