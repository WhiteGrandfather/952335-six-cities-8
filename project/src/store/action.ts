import {ActionType} from '../types/action';
import {Offer} from '../types/offer-type';
import {createAction} from '@reduxjs/toolkit';
import {AuthInfo} from '../types/state';
import {Review} from '../types/review';

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

export const addAuthInfo = createAction(
  ActionType.AddAuthInfo,
  (authInfo: AuthInfo) => ({
    payload: authInfo,
  }),
);

export const changeFavoriteCity = createAction(
  ActionType.ChangeFavoriteCity,
  (cities: Offer[]) => ({
    payload: cities,
  }),
);

export const loadPropertyData = createAction(
  ActionType.LoadPropertyData,
  (property: Offer) => ({
    payload: property,
  }),
);

export const loadNearby = createAction(
  ActionType.LoadNearby,
  (nearby: Offer[]) => ({
    payload: nearby,
  }),
);

export const loadReviews = createAction(
  ActionType.LoadReviews,
  (reviews: Review[]) => ({
    payload: reviews,
  }),
);

export const loadFavorites = createAction(
  ActionType.LoadFavorites,
  (favorites: Offer[]) => ({
    payload: favorites,
  }),
);

export const resetProperty = createAction(
  ActionType.ResetProperty,
);

export const requireLogout = createAction(ActionType.RequireLogout);
