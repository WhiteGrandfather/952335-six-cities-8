import {ActionType} from '../types/action';
import {Offer} from '../types/offer-type';
import {createAction} from '@reduxjs/toolkit';

export const changeCurrentCity = createAction(
  ActionType.ChangeCurrentCity,
  (newCityName: string) => ({
    payload: newCityName,
  }),
);

export const changeOfferSort = createAction(
  ActionType.ChangeOfferSort,
  (sortOfferBy: string) => ({
    payload: sortOfferBy,
  }),
);

export const loadOffers = createAction(
  ActionType.LoadOffers,
  (offers: Offer[]) => ({
    payload: offers,
  }),
);

export const requireAuthorisation = createAction(
  ActionType.RequireAuthorization,
  (authStatus: string) => ({
    payload: authStatus,
  }),
);

export const requireLogout = createAction(ActionType.RequireLogout);
