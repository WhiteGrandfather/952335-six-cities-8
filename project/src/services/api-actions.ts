import {toast} from 'react-toastify';

import {
  APIRoute,
  AUTH_FAIL_MESSAGE,
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
  addAuthInfo,
  changeFavoriteCity,
  loadFavorites,
  loadNearby,
  loadOffers,
  loadPropertyData,
  loadReviews,
  requireAuthorisation,
  requireLogout
} from '../store/action';
import {
  adapter,
  arrAdapter,
  reviewArrAdapter
} from './adapter';
import {AddFavorite} from '../types/add-favorite';
import {
  Review,
  ReviewPost
} from '../types/review';

export const fetchOffersAction = (): ThunkActionResult => (
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Offer[]>(APIRoute.Offers);
    dispatch(loadOffers(arrAdapter(data)));
  }
);

export const checkAuthAction = (): ThunkActionResult => (
  async (dispatch,  _getState, api) => {

    await api.get(APIRoute.Login)
      .then((itm:any): void =>{
        if (itm.payload === AuthorizationStatus.Auth || itm.status === 200) {
          dispatch(requireAuthorisation(AuthorizationStatus.Auth));
          if (itm.status === 200) {
            dispatch(addAuthInfo(itm.data));
          }
        } else {
          toast.info(AUTH_FAIL_MESSAGE);
        }
      });
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
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireLogout());
  }
);

export const changeFavoriteCityAction = ({id, status}: AddFavorite): ThunkActionResult => (
  async (dispatch, _getState, api) => {
    await api.post<Offer[]>(`${APIRoute.Favorite}/${id}/${status}`)
      .then((item)=> {
        if (item.status === 200) {
          dispatch(changeFavoriteCity(item.data));
        } else {
          toast.info(AUTH_FAIL_MESSAGE);
        }
      });
  }
);

export const fetchPropertyAction = (id: number): ThunkActionResult => (
  async (dispatch, _getState, api) => {
    await api.get<Offer>(`${APIRoute.Offers}/${id}`)
      .then((item) => {
        if (item.status === 200) {
          dispatch(loadPropertyData(adapter(item.data)));
        } else {
          toast.info(AUTH_FAIL_MESSAGE);
        }
      });
  }
);

export const loadNearbyAction = (id: number): ThunkActionResult => (
  async (dispatch, _getState, api) => {
    await api.get<Offer[]>(`${APIRoute.Offers}/${id}/nearby`)
      .then((item) => {
        dispatch(loadNearby(arrAdapter(item.data)));
      });
  }
);

export const loadReviewsAction = (id: number): ThunkActionResult => (
  async (dispatch, _getState, api) => {
    await api.get<Review[]>(`${APIRoute.Reviews}/${id}`)
      .then((item) => {
        dispatch(loadReviews(reviewArrAdapter(item.data)));
      });
  }
);

export const fetchReviewAction = (id: number, {comment, rating}: ReviewPost): ThunkActionResult => (
  async (dispatch, _getState, api) => {
    await api.post<Review[]>(`${APIRoute.Reviews}/${id}`, {comment, rating})
      .then((item)=>{
        dispatch(loadReviews(reviewArrAdapter(item.data)));
      });
  }
);

export const fetchFavoritesAction = (): ThunkActionResult => (
  async (dispatch, _getState, api) => {
    await api.get<Offer[]>(`${APIRoute.Favorite}`)
      .then((item)=>{
        dispatch(loadFavorites(arrAdapter(item.data)));
      });
  }
);
