import {combineReducers} from 'redux';
import {offersData} from './offers-data/offers-data';
import {userProcess} from './user-process/user-process';
import {cityProcess} from './city-process/city-pocess';
import {propertyData} from './property-data/property-data';

export enum NameSpace {
  city= 'CITY',
  data = 'DATA',
  user = 'USER',
  property = 'PROPERTY',
}

export const rootReducer = combineReducers({
  [NameSpace.city]: cityProcess,
  [NameSpace.data]: offersData,
  [NameSpace.user]: userProcess,
  [NameSpace.property]: propertyData,
});

export type RootState = ReturnType<typeof rootReducer>;
