import {SortBy} from '../../const';
import {OffersData} from '../../types/state';
import {createReducer} from '@reduxjs/toolkit';
import {
  changeFavoriteCity,
  changeOfferSort,
  loadOffers
} from '../action';
import {adapter} from '../../services/adapter';
import {Offer} from '../../types/offer-type';

const initialStateOffers: OffersData = {
  sortOfferBy: SortBy.Default,
  offers: [],
};

const offersData = createReducer(initialStateOffers, (builder) => {
  builder
    .addCase(changeOfferSort, (state, action) => {
      state.sortOfferBy = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(changeFavoriteCity, (state, action) => {
      const offer: Offer = adapter(action.payload);
      const idx = state.offers.findIndex(({id}) => id === offer.id);
      state.offers[idx] = offer;
    });
});

export {
  offersData,
  initialStateOffers
};
