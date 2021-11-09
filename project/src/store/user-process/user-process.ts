import {AuthorizationStatus} from '../../const';
import {UserData} from '../../types/state';
import {createReducer} from '@reduxjs/toolkit';
import {requireAuthorisation, requireLogout} from '../action';

const initialState: UserData = {
  isDataLoaded: false,
  authorizationStatus: AuthorizationStatus.Unknown,
};


const userProcess = createReducer(initialState, (builder) => {
  builder
    .addCase(requireAuthorisation, (state, action) => {
      state.authorizationStatus= action.payload;
      state.isDataLoaded = true;
    })
    .addCase(requireLogout, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    });
});

export {userProcess};
