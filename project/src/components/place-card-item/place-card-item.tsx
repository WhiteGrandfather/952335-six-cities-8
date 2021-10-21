import React from 'react';
import {Link} from 'react-router-dom';

import type {
  PlaceCardItemProps,
  Multiplier } from './type';

import type {Offer} from '../../types/offer-type';

export default function PlaceCardItem ({
  Offer,
  favorites,
  getHoverOffer,
}: PlaceCardItemProps): JSX.Element {

  const {
    isPremium,
    isFavorite,
    previewImage,
    price,
    rating,
    title,
    type,
    id,
  }: Offer = Offer;

  const STARS_MULTIPLIER: Multiplier = 20;

  const mark: JSX.Element = <div className="place-card__mark"><span>Premium</span></div>;
  const ratingPercent = rating * STARS_MULTIPLIER;

  return (
    <article className={`${favorites?'favorites__card':'cities__place-card'} place-card`}
      onMouseEnter={()=>getHoverOffer && getHoverOffer(id)}
    >
      {isPremium?mark:null}
      <div className={`${favorites?'favorites__image-wrapper':'cities__image-wrapper'} place-card__image-wrapper`}>
        <Link to={`/offer/:id?${id}`}>
          <img className="place-card__image" src={previewImage} width={favorites?'150':'260'} height={favorites?'110':'200'} alt="Place image"/>
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={`place-card__bookmark-button ${isFavorite?'place-card__bookmark-button--active':''} button`} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"/>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${ratingPercent}%`}}/>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/:id?${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type" style={{textTransform: 'capitalize'}}>{type}</p>
      </div>
    </article>
  );
}
