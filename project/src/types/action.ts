import {Action} from 'redux';
import {AxiosInstance} from 'axios';
import {
  ThunkAction,
  ThunkDispatch
} from 'redux-thunk';

import {State} from './state';

export enum ActionType {
  ChangeCurrentCity = 'city/changeCity',
  ChangeFavoriteCity = 'offer/changeFavoriteCity',
  AddOffers = 'offer/addOffer',
  ChangeOfferSort = 'offer/changeOfferSort',
  LoadOffers = 'data/loadOffers',
  RequireAuthorization = 'user/requireAuthorisation',
  RequireLogout = 'user/requireLogout',
  AddAuthInfo = 'user/addAuthInfo',
  LoadFavorites = 'user/loadFavorites',
  LoadPropertyData = 'property/loadPropertyData',
  LoadNearby = 'property/loadNearby',
  LoadReviews = 'property/loadReviews',
  ResetProperty = 'property/resetProperty',
}

export type ThunkActionResult<R = Promise<void> > = ThunkAction<R, State, AxiosInstance, Action>;
export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Action>;
