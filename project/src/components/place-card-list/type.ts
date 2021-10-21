import {Offer} from '../../types/offer-type';

export type PlaceCardListProps = {
  Offers: Offer[],
  getHoverOffer: (id: number) => void,
};
