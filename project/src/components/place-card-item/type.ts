import {Offer} from '../../types/offer-type';

export type PlaceCardItemProps = {
  Offer: Offer,
  favorites: boolean,
  getHoverOffer?: (id: number) => void | undefined,
};
