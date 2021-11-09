import {combineReducers} from 'redux';
import {offersData} from './offers-data/offers-data';
import {userProcess} from './user-process/user-process';

export enum NameSpace {
  data = 'DATA',
  user = 'USER',
}

export const rootReducer = combineReducers({
  [NameSpace.data]: offersData,
  [NameSpace.user]: userProcess,
});

export type RootState = ReturnType<typeof rootReducer>;
