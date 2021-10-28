import {Offer} from './offer-type';

export type State = {
  currentCity: string,
  sortOfferBy: string,
  offers: Offer[],
}
