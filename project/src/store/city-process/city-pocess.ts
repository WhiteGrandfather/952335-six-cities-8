import {createReducer} from '@reduxjs/toolkit';
import {changeCurrentCity} from '../action';
import {CityData} from '../../types/state';

const initialStateCity: CityData = {
  currentCity: 'Paris',
};

const cityProcess = createReducer(initialStateCity, (builder) => {
  builder
    .addCase(changeCurrentCity, (state, action) => {
      state.currentCity = action.payload;
    });
});

export {
  cityProcess,
  initialStateCity
};
