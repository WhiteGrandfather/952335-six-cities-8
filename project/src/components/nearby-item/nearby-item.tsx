import React from 'react';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import {
  Link,
  useHistory
} from 'react-router-dom';

import {Offer} from '../../types/offer-type';
import {changeFavoriteCityAction} from '../../services/api-actions';
import {getAuthorizationStatus} from '../../store/user-process/selector';
import {
  APIRoute,
  AuthorizationStatus
} from '../../const';
import {getWidthByRating} from '../../utils/utils';

type NearbyItemProps = {
  nearby: Offer,
};

export default function NearbyItem({nearby}: NearbyItemProps): JSX.Element {
  const {
    isFavorite,
    previewImage,
    price,
    rating,
    title,
    type,
    id,
  }: Offer = nearby;

  const history = useHistory();
  const dispatch = useDispatch();
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const isLoggedIn = authorizationStatus === AuthorizationStatus.Auth;

  return (
    <article className="near-places__card place-card">
      <div className="near-places__image-wrapper place-card__image-wrapper">
        <Link to={`/offer/:id?${id}`}>
          <img className="place-card__image"
            src={previewImage}
            width="260"
            height="200"
            alt="Place image"
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={`place-card__bookmark-button ${isFavorite?'place-card__bookmark-button--active':''} button`}
            type="button"
            onClick={() =>{
              if (!isLoggedIn) {
                history.push(APIRoute.Login);
              } else {
                dispatch(changeFavoriteCityAction({id, status: Number(!isFavorite)}));
              }
            }}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"/>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${getWidthByRating(rating)}%`}}/>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/:id?${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

