import {
  AuthInfo,
  State
} from '../../types/state';
import {NameSpace} from '../root-reducer';
import {Offer} from '../../types/offer-type';

export const getIsDataLoaded = (state: State): boolean => state[NameSpace.user].isDataLoaded;
export const getAuthorizationStatus = (state: State): string => state[NameSpace.user].authorizationStatus;
export const getAuthInfo = (state: State): AuthInfo => state[NameSpace.user].authInfo;
export const getFavorites = (state: State): Offer[] => state[NameSpace.user].favoritesCity;
