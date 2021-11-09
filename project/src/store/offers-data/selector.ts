import {State} from '../../types/state';
import {NameSpace} from '../root-reducer';
import {Offer} from '../../types/offer-type';

export const getOffers = (state: State): Offer[] => state[NameSpace.data].offers;
export const getSortOfferBy = (state: State): string => state[NameSpace.data].sortOfferBy;
export const getCurrentCity = (state: State): string => state[NameSpace.data].currentCity;
