import {Offer} from './offer-type';
import {RootState} from '../store/root-reducer';
import {Review} from './review';

export type CityData = {
  currentCity: string,
}

export type OffersData = {
  sortOfferBy: string,
  offers: Offer[],
}

export type AuthInfo = {
  avatarUrl: string,
  email: string,
  id: number,
  isPro: boolean,
  name: string,
};

export type UserData = {
  isDataLoaded: boolean,
  authorizationStatus: string,
  favoritesCity: Offer[],
  authInfo: AuthInfo,
};

export type PropertyData = {
  propertyData: Offer | null,
  reviews: Review[],
  nearby: Offer[],
}

export type State = RootState;
