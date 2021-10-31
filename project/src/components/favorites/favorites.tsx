import React from 'react';

import Header from '../header/header';
import PlaceCardItem from '../place-card-item/place-card-item';
import {Offer} from '../../types/offer-type';
import {FavoritesListProps} from '../app/types';
import {State} from '../../types/state';
import {connect, ConnectedProps} from 'react-redux';


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


//Подготавливает типы для props из Redux store
const mapStateToProps = ({offers}: State) => ({
  offers,
});

//Создает константу connector для подключения props из Redux в компонент
const connector = connect(mapStateToProps);

// Подготавливает типы props для компонента
type PropsFromRedux = ConnectedProps<typeof connector>;


export function Favorites({offers}: PropsFromRedux): JSX.Element {

  function renderFavList(): JSX.Element[] {
    const arrLIst = getFavoritesList(offers).map(({favName, favList}) => {
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

export default connector(Favorites);
