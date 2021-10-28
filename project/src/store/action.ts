import {
  ActionType,
  AddOffersAction,
  ChangeCurrentCityAction,
  ChangeOfferSortAction
} from '../types/action';
import {Offer} from '../types/offer-type';

export const ChangeCurrentCity = (newCityName: string): ChangeCurrentCityAction => ({
  type: ActionType.ChangeCurrentCity,
  payload: newCityName,
});

export const AddOffers = (offers: Offer[]): AddOffersAction => ({
  type: ActionType.AddOffers,
  payload: offers,
});

export const ChangeOfferSort = (sortOfferBy: string): ChangeOfferSortAction => ({
  type: ActionType.ChangeOfferSort,
  payload: sortOfferBy,
});
