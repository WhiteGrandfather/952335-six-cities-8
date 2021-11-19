import {AuthorizationStatus} from '../../const';
import {UserData} from '../../types/state';
import {createReducer} from '@reduxjs/toolkit';
import {
  addAuthInfo,
  loadFavorites,
  requireAuthorisation,
  requireLogout
} from '../action';
import {authInfoAdapter} from '../../services/adapter';

const initialState: UserData = {
  isDataLoaded: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  favoritesCity: [],
  authInfo: {
    avatarUrl: '',
    email: '',
    id: 0,
    isPro: false,
    name: '',
  },
};

const userProcess = createReducer(initialState, (builder) => {
  builder
    .addCase(requireAuthorisation, (state, action) => {
      state.authorizationStatus= action.payload;
      state.isDataLoaded = true;
    })
    .addCase(requireLogout, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
      state.authInfo = initialState.authInfo;
      state.favoritesCity = [];
    })
    .addCase(addAuthInfo, (state, action) => {
      state.authInfo = authInfoAdapter(action.payload);
    })
    .addCase(loadFavorites, (state, action) => {
      state.favoritesCity = action.payload;
    });
});

export {userProcess , initialState};
