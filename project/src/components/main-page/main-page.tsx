import React, {useState} from 'react';
import {
  connect,
  ConnectedProps
} from 'react-redux';

import Header from '../header/header';
import Map from '../map/map';
import MainEmpty from '../main-empty/main-empty';
import PlaceCardList from '../place-card-list/place-card-list';
import TabsList from '../tabs-list/tabs-list';

import type {
  City,
  Points
} from '../../types/map-type';
import type {Offer} from '../../types/offer-type';
import type {State} from '../../types/state';

const TAB_INDEX = 0;
const MIN_OFFERS = 0;

const mapStateToProps = ({currentCity, offers}: State) => ({
  currentCity,
  offers,
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>

function MainPage({currentCity, offers}: PropsFromRedux): JSX.Element {

  const [onHoverId, setOnHoverId] = useState<number | null>(null);
  const [city, setCity] = useState<City | null>(null);

  const currentOffers: Offer[] = offers
    .filter((item)=> {
      if (item.city.name === currentCity) {
        if (city === null || city.title !== currentCity) {
          setCity({
            title: item.city.name,
            longitude: item.city.location.longitude,
            latitude: item.city.location.latitude,
            zoom: item.city.location.zoom,
          });
        }
        return true;
      }
      return false;
    });

  const points: Points = currentOffers
    .map((item)=> ({
      id: item.id,
      latitude: item.location.latitude,
      longitude: item.location.longitude,
      zoom: item.location.zoom,
    }));

  const getHoverOffer = (id: number) => {
    setOnHoverId(id);
  };

  const isEmptyPage: boolean = currentOffers.length <= MIN_OFFERS;

  const haveOffers: JSX.Element = (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">
            {currentOffers.length} places to stay in {currentCity}
          </b>
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
            onMouseLeave={()=>setOnHoverId(null)}
          >
            <PlaceCardList Offers={currentOffers} getHoverOffer={getHoverOffer}/>
          </div>
        </section>
        <div className="cities__right-section">
          <section className="cities__map map">
            {city !== null && <Map city={city} points={points} onHoverId={onHoverId}/>}
          </section>
        </div>
      </div>
    </div>
  );

  return (
    <div className="page page--gray page--main">
      <Header ShowNav/>
      <main className={`page__main page__main--index ${isEmptyPage?'page__main--index-empty':''}`}>
        <h1 className="visually-hidden">Cities</h1>
        <TabsList/>

        {isEmptyPage ?  <MainEmpty/> : haveOffers}
      </main>
    </div>
  );
}

export {MainPage};
export default connector(MainPage);
