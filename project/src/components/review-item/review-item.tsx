import React from 'react';

import {ReviewItemProps} from './types';
import {getWidthByRating} from '../../utils/utils';

export default function ReviewItem(
  {review: {
    user: {
      name,
      avatarUrl,
    },
    comment,
    date,
    rating,
  }}: ReviewItemProps):JSX.Element {

  const dateTime = new Date(date);

  const avatar = (
    <img className="reviews__avatar user__avatar"
      src={avatarUrl}
      width="54"
      height="54"
      alt="Reviews avatar"
    />
  );

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          {avatarUrl && avatar}
        </div>
        <span className="reviews__user-name">
          {name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: `${getWidthByRating(rating)}%`}}/>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {comment}
        </p>
        <time className="reviews__time" dateTime={dateTime.toLocaleDateString()}>
          {dateTime.toLocaleDateString('en-CA', {year: 'numeric', month: 'short'})}
        </time>
      </div>
    </li>
  );
}
