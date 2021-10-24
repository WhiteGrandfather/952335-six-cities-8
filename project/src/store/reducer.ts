import {Actions, ActionType} from '../types/action';
import {State} from '../types/state';

const initialState = {
  currentCity: '',
  offers: [],
};

const reducer = (state: State = initialState, action: Actions) => {
  switch (action.type) {
    case ActionType.ChangeCurrentCity:
      return {...state, currentCity: action.payload};
    case ActionType.AddOffers:
      return {...state, offers: action.payload};
    default:
      return state;
  }
};

export {reducer};
