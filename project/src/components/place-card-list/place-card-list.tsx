import React from 'react';

import PlaceCardItem from '../place-card-item/place-card-item';

import type {PlaceCardListProps} from './type';
import type {Offer} from '../../types/offer-type';

export default function PlaceCardList({Offers}: PlaceCardListProps): JSX.Element {
  return (
    <>
      {Offers.map((item: Offer) => (
        <PlaceCardItem
          Offer={item}
          favorites={false}
          key={`${item.id}-card`}
        />
      ))}
    </>
  );
}
