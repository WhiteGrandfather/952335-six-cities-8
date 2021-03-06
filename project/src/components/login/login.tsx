import React, {
  FormEvent,
  useEffect,
  useRef,
  useState
} from 'react';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import {
  useHistory,
  Redirect,
  Link
} from 'react-router-dom';

import {
  AppRoute,
  AuthorizationStatus,
  CITY_LIST
} from '../../const';
import {getAuthorizationStatus} from '../../store/user-process/selector';
import Header from '../header/header';
import {loginAction} from '../../services/api-actions';
import {ToastContainer} from 'react-toastify';
import {changeCurrentCity} from '../../store/action';

function Login(): JSX.Element {
  const authorizationStatus = useSelector(getAuthorizationStatus);

  const [city, setCity] = useState<string | null>(null);

  const dispatch = useDispatch();
  const history = useHistory();

  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const getRandom = (list: string[]): string => {
    const randomNumber = Math.round(((Math.random() * 100) / (100 / (list.length - 1))));
    return list[randomNumber];
  };

  useEffect(() => {
    setCity(getRandom(CITY_LIST));
  }, []);

  function renderSubmit(evt : FormEvent< HTMLFormElement>): void {
    evt.preventDefault();
    if (loginRef.current !== null && passwordRef.current !== null) {
      dispatch(loginAction({
        login: loginRef.current.value,
        password: passwordRef.current.value,
      }));
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
              onSubmit={renderSubmit}
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
              <Link className="locations__item-link"
                to={AppRoute.Root}
                onClick={() => {
                  if (city !== null) {
                    dispatch(changeCurrentCity(city));
                  }
                }}
              >
                <span>
                  {city}
                </span>
              </Link>
            </div>
          </section>
        </div>
      </main>
      <ToastContainer/>
    </div>
  );
}

export default Login;
