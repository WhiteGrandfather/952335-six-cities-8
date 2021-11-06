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
import SortList from '../sort-list/sort-list';
import {ToastContainer} from 'react-toastify';

// Минимальное количество Offer
const MIN_OFFERS = 0;

//Подготавливает типы для props из Redux store
const mapStateToProps = ({currentCity, offers, sortOfferBy}: State) => ({
  currentCity,
  sortOfferBy,
  offers,
});

//Создает константу connector для подключения props из Redux в компонент
const connector = connect(mapStateToProps);

// Подготавливает типы props для компонента
type PropsFromRedux = ConnectedProps<typeof connector>;

// currentCity = string (выбранный город сортировки)
// offers = массив Offer (предложения аренды)
// sortOfferBy = string (вид сортировки)
function MainPage({currentCity, offers, sortOfferBy}: PropsFromRedux): JSX.Element {

  const [onHoverId, setOnHoverId] = useState<number | null>(null);
  const [city, setCity] = useState<City | null>(null);

  // Фильтрует Offer[] на соответствие городу
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

  // Создаёт массив маркеров для карты
  const points: Points = currentOffers
    .map((item)=> ({
      id: item.id,
      latitude: item.location.latitude,
      longitude: item.location.longitude,
      zoom: item.location.zoom,
    }));

  // Находит id Offer`а на который наведена мышь
  const getHoverOffer = (id: number) => {
    setOnHoverId(id);
  };

  // Сортировка Offer
  const sortedOffers = currentOffers.sort((a,b) => {
    switch (sortOfferBy) {
      case 'Price: low to high':
        if (a.price === b.price) {return 0;}
        return a.price > b.price? 1 : -1;
      case 'Price: high to low':
        if (a.price === b.price) {return 0;}
        return a.price > b.price? -1 : 1;
      case 'Top rated first':
        if (a.rating === b.rating) {return 0;}
        return a.rating > b.rating? -1 : 1;
      default:
        return 0;
    }
  });

  // Определяет наличие предложений
  const isEmptyPage: boolean = currentOffers.length <= MIN_OFFERS;

  //Показывает компонент нет предложений или список предложений аренды и карту
  const isOffers = (): JSX.Element => {
    if (isEmptyPage) {
      //Возвращает компонент нет предложений
      return <MainEmpty/>;
    } else {
      // Возвращает список предложений аренды и карту
      return (
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">
                {currentOffers.length} places to stay in {currentCity}
              </b>
              <SortList />
              <div className="cities__places-list places__list tabs__content"
                onMouseLeave={()=>setOnHoverId(null)}
              >
                <PlaceCardList Offers={sortedOffers} getHoverOffer={getHoverOffer}/>
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
    }
  };

  return (
    <div className="page page--gray page--main">
      <Header ShowNav/>
      <main className={`page__main page__main--index ${isEmptyPage?'page__main--index-empty':''}`}>
        <h1 className="visually-hidden">Cities</h1>
        <TabsList/>

        {isOffers()}
      </main>
      <ToastContainer/>
    </div>
  );
}

export {MainPage};
export default connector(MainPage);
