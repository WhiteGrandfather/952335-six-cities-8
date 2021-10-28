import {Actions, ActionType} from '../types/action';
import {State} from '../types/state';

const initialState = {
  currentCity: '',
  sortOfferBy: '',
  offers: [],
};

const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.ChangeCurrentCity:
      return {...state, currentCity: action.payload};
    case ActionType.AddOffers:
      return {...state, offers: action.payload};
    case ActionType.ChangeOfferSort:
      return {...state, sortOfferBy: action.payload};
    default:
      return state;
  }
};

export {reducer};
