import React, {useEffect} from 'react';
import {
  Redirect,
  Route,
  useLocation,
  useHistory
} from 'react-router-dom';
import {
  useDispatch,
  useSelector
} from 'react-redux';

import Header from '../header/header';
import ReviewList from '../review-list/review-list';
import Map from '../map/map';

import type {Multiplier} from '../place-card-item/type';
import type {
  City,
  Points
} from '../../types/map-type';
import {
  changeFavoriteCityAction,
  fetchPropertyAction,
  loadNearbyAction
} from '../../services/api-actions';
import {
  getNearby,
  getPropertyData
} from '../../store/property-data/selector';
import NearbyItem from '../nearby-item/nearby-item';
import {
  APIRoute,
  AuthorizationStatus
} from '../../const';
import {getAuthorizationStatus} from '../../store/user-process/selector';
import LoadingScreen from '../loading-screen/loading-screen';
import {resetProperty} from '../../store/action';

export function Property(): JSX.Element {
  const MAX_IMAGES_COUNT = 6;
  const STARS_MULTIPLIER: Multiplier = 20;

  const dispatch = useDispatch();
  const history = useHistory();
  const locationRout = useLocation();

  const property = useSelector(getPropertyData);
  const nearby = useSelector(getNearby);
  const authorizationStatus = useSelector(getAuthorizationStatus);

  const isLoggedIn = authorizationStatus === AuthorizationStatus.Auth;
  const pageId: string = locationRout.search.replace('?', '');
  let maxID = 100;

  useEffect(() => {
    dispatch(resetProperty());
    dispatch(fetchPropertyAction(parseInt(pageId, 10)));
    dispatch(loadNearbyAction(parseInt(pageId, 10)));
  },[pageId]);

  if (property !== null) {
    const {
      id,
      images,
      title,
      rating,
      type,
      bedrooms,
      city,
      location,
      maxAdults,
      price,
      goods,
      description,
      isFavorite,
      host:{
        avatarUrl,
        isPro,
        name,
      },
    } = property;

    const propertyLocation: Points = [{
      id: id,
      latitude: location.latitude,
      longitude: location.longitude,
      zoom: location.zoom,
    }];

    let points: Points = propertyLocation;

    if (nearby.length > 0) {
      // Создаёт массив маркеров для карты
      const pointsNearby: Points = nearby
        .map((item)=> ({
          id: item.id,
          latitude: item.location.latitude,
          longitude: item.location.longitude,
          zoom: item.location.zoom,
        }));

      points = [ ...propertyLocation, ...pointsNearby];
    }

    const propertyCity: City = {
      title: city.name,
      latitude: city.location.latitude,
      longitude: city.location.longitude,
      zoom: city.location.zoom,
    };

    const ratingPercent = rating * STARS_MULTIPLIER;

    const imagesList = images.map((image) => (
      <div className="property__image-wrapper" key={maxID++}>
        <img className="property__image" src={image} alt="Photo studio"/>
      </div>
    ));

    if (imagesList.length > MAX_IMAGES_COUNT) {
      imagesList.length = MAX_IMAGES_COUNT;
    }

    const goodsList = goods.map((good) => (
      <li className="property__inside-item" key={maxID++}>
        {good}
      </li>
    ));
    return (
      <div className="page" key={`${id}-prop`}>

        <Header ShowNav />

        <main className="page__main page__main--property">
          <section className="property">
            <div className="property__gallery-container container">
              <div className="property__gallery">
                {imagesList}
              </div>
            </div>
            <div className="property__container container">
              <div className="property__wrapper">
                <div className="property__mark">
                  <span>Premium</span>
                </div>
                <div className="property__name-wrapper">
                  <h1 className="property__name">
                    {title}
                  </h1>
                  <button className={`property__bookmark-button ${isFavorite?'property__bookmark-button--active':''} button`}
                    type="button"
                    onClick={() =>{
                      if (!isLoggedIn) {
                        history.push(APIRoute.Login);
                      } else {
                        dispatch(changeFavoriteCityAction({id, status: Number(!isFavorite)}));
                        dispatch(fetchPropertyAction(parseInt(pageId, 10)));
                      }
                    }}
                  >
                    <svg className="property__bookmark-icon" width="31" height="33">
                      <use xlinkHref="#icon-bookmark"/>
                    </svg>
                    <span className="visually-hidden">To bookmarks</span>
                  </button>
                </div>
                <div className="property__rating rating">
                  <div className="property__stars rating__stars">
                    <span style={{width: `${ratingPercent}%`}}/>
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="property__rating-value rating__value">
                    {rating}
                  </span>
                </div>
                <ul className="property__features">
                  <li className="property__feature property__feature--entire" style={{textTransform: 'capitalize'}}>
                    {type}
                  </li>
                  <li className="property__feature property__feature--bedrooms">
                    {`${bedrooms} Bedrooms`}
                  </li>
                  <li className="property__feature property__feature--adults">
                      Max {maxAdults} adults
                  </li>
                </ul>
                <div className="property__price">
                  <b className="property__price-value">&euro;{price}</b>
                  <span className="property__price-text">&nbsp;night</span>
                </div>
                <div className="property__inside">
                  <h2 className="property__inside-title">What&apos;s inside</h2>
                  <ul className="property__inside-list">
                    {goodsList}
                  </ul>
                </div>
                <div className="property__host">
                  <h2 className="property__host-title">Meet the host</h2>
                  <div className="property__host-user user">
                    <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                      <img className="property__avatar user__avatar"
                        src={avatarUrl}
                        width="74" height="74"
                        alt="Host avatar"
                      />
                    </div>
                    <span className="property__user-name">
                      {name}
                    </span>
                    {isPro?<span className="property__user-status">Pro</span>:''}
                  </div>
                  <div className="property__description">
                    <p className="property__text">
                      {description}
                    </p>
                  </div>
                </div>

                <ReviewList
                  itemId={parseInt(pageId, 10)}
                  isLoggedIn={isLoggedIn}
                />

              </div>
            </div>
            <section className="property__map map">
              <Map
                city={propertyCity}
                points={points}
                onHoverId={parseInt(pageId, 10)}
              />
            </section>
          </section>
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">Other places in the neighbourhood</h2>
              <div className="near-places__list places__list">
                {nearby.map((item)=> (
                  <NearbyItem
                    key={item.id}
                    nearby={item}
                  />
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    );
  }

  return <LoadingScreen/>;

  return (
    <Route
      render={()=> <Redirect to='/404'/>}
    />
  );
}

export default Property;
