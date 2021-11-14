import {State} from '../../types/state';
import {NameSpace} from '../root-reducer';

export const getCurrentCity = (state: State): string => state[NameSpace.city].currentCity;
