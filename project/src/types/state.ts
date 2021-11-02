import {Offer} from './offer-type';

export type State = {
  isDataLoaded: boolean,
  currentCity: string,
  sortOfferBy: string,
  offers: Offer[],
  authorizationStatus: string,
}
