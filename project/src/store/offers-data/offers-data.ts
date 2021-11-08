import {SortBy} from '../../const';
import {OffersData} from '../../types/state';
import {createReducer} from '@reduxjs/toolkit';
import {changeCurrentCity, changeOfferSort, loadOffers} from '../action';

const initialState: OffersData = {
  currentCity: 'Paris',
  sortOfferBy: SortBy.Default,
  offers: [],
};

const offersData = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCurrentCity, (state, action) => {
      state.currentCity = action.payload;
    })
    .addCase(changeOfferSort, (state, action) => {
      state.sortOfferBy = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    });
});

export {offersData};
