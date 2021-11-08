import {State} from '../../types/state';
import {NameSpace} from '../root-reducer';

export const getIsDataLoaded = (state: State): boolean => state[NameSpace.user].isDataLoaded;
export const getAuthorizationStatus = (state: State): string => state[NameSpace.user].authorizationStatus;
