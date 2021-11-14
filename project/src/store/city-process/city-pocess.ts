import {createReducer} from '@reduxjs/toolkit';
import {changeCurrentCity} from '../action';
import {CityData} from '../../types/state';

const initialState: CityData = {
  currentCity: 'Paris',
};

const cityProcess = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCurrentCity, (state, action) => {
      state.currentCity = action.payload;
    });
});

export {cityProcess};
