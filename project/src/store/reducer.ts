import {
  Actions,
  ActionType
} from '../types/action';
import {State} from '../types/state';
import {
  AuthorizationStatus,
  SortBy
} from '../const';

const initialState = {
  isDataLoaded: false,
  currentCity: 'Paris',
  sortOfferBy: SortBy.Default,
  offers: [],
  authorizationStatus: AuthorizationStatus.Unknown,
};

const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.ChangeCurrentCity:
      return {...state, currentCity: action.payload};
    case ActionType.AddOffers:
      return {...state, offers: action.payload};
    case ActionType.ChangeOfferSort:
      return {...state, sortOfferBy: action.payload};
    case ActionType.LoadOffers:
      return {...state, offers: action.payload};
    case ActionType.RequireAuthorization:
      return {
        ...state,
        authorizationStatus: action.payload,
        isDataLoaded: true};
    case ActionType.RequireLogout:
      return {...state, authorizationStatus: AuthorizationStatus.NoAuth};
    default:
      return state;
  }
};

export {reducer};
