import {
  ActionType,
  AddOffersAction,
  ChangeCurrentCityAction,
  ChangeOfferSortAction,
  LoadOffersAction,
  RequireAuthorizationAction,
  RequireLogoutAction
} from '../types/action';
import {Offer} from '../types/offer-type';


export const changeCurrentCity = (newCityName: string): ChangeCurrentCityAction => ({
  type: ActionType.ChangeCurrentCity,
  payload: newCityName,
} as const);

export const addOffers = (offers: Offer[]):AddOffersAction => ({
  type: ActionType.AddOffers,
  payload: offers,
} as const);

export const changeOfferSort = (sortOfferBy: string): ChangeOfferSortAction => ({
  type: ActionType.ChangeOfferSort,
  payload: sortOfferBy,
} as const);

export const loadOffers = (offers: Offer[]): LoadOffersAction => ({
  type: ActionType.LoadOffers,
  payload: offers,
} as const);

export const requireAuthorisation = (authStatus: string): RequireAuthorizationAction => ({
  type: ActionType.RequireAuthorization,
  payload: authStatus,
});

export const requireLogout = (): RequireLogoutAction => ({
  type: ActionType.RequireLogout,
});
