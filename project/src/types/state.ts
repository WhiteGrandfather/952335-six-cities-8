import {Offer} from './offer-type';
import {RootState} from '../store/root-reducer';

export type OffersData = {
  currentCity: string,
  sortOfferBy: string,
  offers: Offer[],
}

export type UserData = {
  isDataLoaded: boolean,
  authorizationStatus: string,
}

export type State = RootState;
