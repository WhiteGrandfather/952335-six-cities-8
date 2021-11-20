import {PropertyData} from '../../types/state';
import {createReducer} from '@reduxjs/toolkit';
import {
  loadNearby,
  loadPropertyData,
  loadReviews,
  resetProperty
} from '../action';

const initialStateProperty: PropertyData = {
  propertys: null,
  reviews: [],
  nearby: [],
};

const propertyData = createReducer(initialStateProperty, (builder) => {
  builder
    .addCase(loadPropertyData, (state, action) => {
      state.propertys = action.payload;
    })
    .addCase(loadNearby, (state, action) => {
      state.nearby = action.payload;
    })
    .addCase(loadReviews, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(resetProperty, (state) => {
      state = initialStateProperty;
    });
});

export {
  propertyData,
  initialStateProperty
};
