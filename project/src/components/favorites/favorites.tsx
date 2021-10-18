import React from 'react';

import {FavoritesProps} from './types';
import Header from '../header/header';
import PlaceCardItem from '../place-card-item/place-card-item';

export default function Favorites({favoritesList}: FavoritesProps): JSX.Element {

  function renderFavList(): JSX.Element[] {
    const arrLIst = favoritesList.map(({favName, favList}) => {
      const cardList = favList.map((item) => <PlaceCardItem Offer={item} favorites key={`${item.id}-card`}/>);

      return (
        <li className="favorites__locations-items" key={favName}>
          <div className="favorites__locations locations locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>{favName}</span>
              </a>
            </div>
          </div>
          <div className="favorites__places">
            {cardList}
          </div>
        </li>
      );
    });

    return arrLIst;
  }

  return (
    <div className="page">
      <Header  ShowNav/>

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {renderFavList()}
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
