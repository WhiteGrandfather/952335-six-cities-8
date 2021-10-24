import React from 'react';

import PlaceCardItem from '../place-card-item/place-card-item';

import type {PlaceCardListProps} from './type';
import type {Offer} from '../../types/offer-type';

function PlaceCardList({Offers, getHoverOffer}: PlaceCardListProps): JSX.Element {
  return (
    <>
      {Offers.map((item: Offer) => (
        <PlaceCardItem
          Offer={item}
          favorites={false}
          getHoverOffer={getHoverOffer}
          key={`${item.id}-card`}
        />
      ))}
    </>
  );
}

export default PlaceCardList;
