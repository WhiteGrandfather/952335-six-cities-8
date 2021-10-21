import React, {useState} from 'react';

import PlaceCardList from '../place-card-list/place-card-list';

import Header from '../header/header';
import type {MainPageProps} from './types';
import Map from '../map/map';
import {City, Points} from '../../types/map-type';
import {Offer} from '../../types/offer-type';

const TAB_INDEX = 0;

const city: City = {
  'title': 'Amsterdam',
  'latitude': 52.370216,
  'longitude': 4.895168,
  'zoom': 10,
};

export default function MainPage({Offers}: MainPageProps): JSX.Element {
  const [isOnHOver, setIsOnHOver] = useState<number | null>(null);

  const currentOffers: Offer[] = Offers
    .filter((item)=>item.city.name === city.title);

  const points: Points = currentOffers
    .map((item)=> ({
      'id': item.id,
      'latitude': item.location.latitude,
      'longitude': item.location.longitude,
      'zoom': item.location.zoom,
    }));

  const getHoverOffer = (id: number) => {
    setIsOnHOver(id);
  };

  return (
    <div className="page page--gray page--main">

      <Header ShowNav/>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="#">
                  <span>Paris</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="#">
                  <span>Cologne</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="#">
                  <span>Brussels</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item tabs__item--active">
                  <span>Amsterdam</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="#">
                  <span>Hamburg</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="#">
                  <span>Dusseldorf</span>
                </a>
              </li>
            </ul>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">312 places to stay in Amsterdam</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={TAB_INDEX}>
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"/>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex={TAB_INDEX}>Popular</li>
                  <li className="places__option" tabIndex={TAB_INDEX}>Price: low to high</li>
                  <li className="places__option" tabIndex={TAB_INDEX}>Price: high to low</li>
                  <li className="places__option" tabIndex={TAB_INDEX}>Top rated first</li>
                </ul>
              </form>
              <div className="cities__places-list places__list tabs__content"
                onMouseLeave={()=>setIsOnHOver(null)}
              >
                <PlaceCardList Offers={currentOffers} getHoverOffer={getHoverOffer}/>
              </div>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map city={city} points={points} isOnHOver={isOnHOver}/>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
