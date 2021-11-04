import {AxiosResponse} from 'axios';

import {
  APIRoute,
  AuthorizationStatus
} from '../const';
import {ThunkActionResult} from '../types/action';
import {
  saveToken,
  dropToken,
  Token
} from './token';
import {AuthData} from '../types/auth-data';
import {Offer} from '../types/offer-type';
import {
  loadOffers,
  requireAuthorisation,
  requireLogout
} from '../store/action';
import {arrAdapter} from './adapter';

export const fetchOffersAction = (): ThunkActionResult => (
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Offer[]>(APIRoute.Offers);
    dispatch(loadOffers(arrAdapter(data)));
  }
);

export const checkAuthAction = (): ThunkActionResult => (
  async (dispatch,  _getState, api) => {
    const {payload} = await api.get<AxiosResponse, {payload: AuthorizationStatus}>(APIRoute.Login);
    if (payload === AuthorizationStatus.Auth) {
      dispatch(requireAuthorisation(AuthorizationStatus.Auth));
    }
  }
);

export const loginAction = ({login: email, password}: AuthData): ThunkActionResult => (
  async (dispatch, _getState, api) => {
    const {data: {token}} = await api.post<{token: Token}>(APIRoute.Login, {email, password});
    saveToken(token);
    dispatch(requireAuthorisation(AuthorizationStatus.Auth));
  }
);

export const logoutAction = (): ThunkActionResult => (
  async (dispatch, _getState, api) => {
    api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireLogout());
  }
);
