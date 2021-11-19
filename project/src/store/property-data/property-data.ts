import {PropertyData} from '../../types/state';
import {createReducer} from '@reduxjs/toolkit';
import {
  loadNearby,
  loadPropertyData,
  loadReviews,
  resetProperty
} from '../action';

export const initialState: PropertyData = {
  propertyData: null,
  reviews: [],
  nearby: [],
};

const propertyData = createReducer(initialState, (builder) => {
  builder
    .addCase(loadPropertyData, (state, action) => {
      state.propertyData = action.payload;
    })
    .addCase(loadNearby, (state, action) => {
      state.nearby = action.payload;
    })
    .addCase(loadReviews, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(resetProperty, (state) => {
      state = initialState;
    });
});

export {propertyData};
