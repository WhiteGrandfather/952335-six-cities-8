import {Offer} from './offer-type';

export enum ActionType {
  ChangeCurrentCity = 'city/changeCity',
  AddOffers = 'offer/addOffer',
  ChangeOfferSort = 'offer/changeOfferSort',
}

export type ChangeCurrentCityAction = {
  type: ActionType.ChangeCurrentCity,
  payload: string,
}

export type AddOffersAction = {
  type: ActionType.AddOffers,
  payload: Offer[],
}

export type ChangeOfferSortAction = {
  type: ActionType.ChangeOfferSort,
  payload: string,
}

export type Actions =
    ChangeCurrentCityAction
  | AddOffersAction
  | ChangeOfferSortAction;
