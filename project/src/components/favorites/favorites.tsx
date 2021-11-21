import React, {useEffect} from 'react';

import Header from '../header/header';
import PlaceCardItem from '../place-card-item/place-card-item';
import {Offer} from '../../types/offer-type';
import {FavoritesListProps} from '../app/types';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import {
  getAuthorizationStatus,
  getFavorites
} from '../../store/user-process/selector';
import {fetchFavoritesAction} from '../../services/api-actions';
import {
  Link,
  Redirect,
  useHistory
} from 'react-router-dom';
import {changeCurrentCity} from '../../store/action';
import {
  AppRoute,
  AuthorizationStatus
} from '../../const';

export function Favorites(): JSX.Element {
  const history = useHistory();
  const dispatch = useDispatch();

  const favorites = useSelector(getFavorites);
  const authorizationStatus = useSelector(getAuthorizationStatus);

  useEffect(()=> {
    dispatch(fetchFavoritesAction());
  },[favorites,dispatch]);

  function getFavoritesList (array: Offer[]): FavoritesListProps[] {
    const cityList = array
      .filter((item)=> item.isFavorite)
      .map((item) => item.city.name);

    const unicsCityList: string[] = [...new Set(cityList)];

    return unicsCityList.map((item) => ({
      favName: item,
      favList: array.filter((el) => item === el.city.name && el.isFavorite),
    }));
  }

  let favoriteList: JSX.Element[] | null = null;

  if (favorites.length > 0) {
    favoriteList = getFavoritesList(favorites).map(({favName, favList}) => (
      <li className="favorites__locations-items"
        key={favName}
      >
        <div className="favorites__locations locations locations--current">
          <div className="locations__item">
            <Link className="locations__item-link"
              to={AppRoute.Root}
              onClick={()=>dispatch(changeCurrentCity(favName))}
            >
              <span>{favName}</span>
            </Link>
          </div>
        </div>
        <div className="favorites__places">
          {favList.map((item) => <PlaceCardItem Offer={item} favorites key={`${item.id}-card`}/>)}
        </div>
      </li>
    ));
  }

  const noFavorites = (
    <section className="favorites favorites--empty" data-testid="favorites">
      <h1 className="visually-hidden">Favorites (empty)</h1>
      <div className="favorites__status-wrapper">
        <b className="favorites__status">Nothing yet saved.</b>
        <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
      </div>
    </section>
  );

  if (authorizationStatus !== AuthorizationStatus.Auth) {
    history.push(AppRoute.Root);
    return (
      <Redirect to={AppRoute.Root} />
    );
  }

  return (
    <div className="page" data-testid="favorites">
      <Header  ShowNav/>

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {favoriteList !== null? favoriteList : noFavorites}
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
        </a>
      </footer>
    </div>
  );
}

export default Favorites;
