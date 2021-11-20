import {State} from '../../types/state';
import {NameSpace} from '../root-reducer';
import {Offer} from '../../types/offer-type';
import {Review} from '../../types/review';

export const getPropertyData = (state: State): Offer | null => state[NameSpace.property].propertys;
export const getNearby = (state: State): Offer[] => state[NameSpace.property].nearby;
export const getReviews = (state: State): Review[] => state[NameSpace.property].reviews;
