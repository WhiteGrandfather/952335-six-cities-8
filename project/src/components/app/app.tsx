import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch } from 'react-router-dom';

import MainPage from '../main-page/main-page';
import Login from '../login/login';
import Page404 from '../page-404/page404';
import Property from '../propery/property';
import PrivetRoute from '../privet-route/privet-route';

import type {Offer} from '../../types/offer-type';
import type {
  AppProps,
  FavoritesListProps,
  loggedType } from './types';

function getFavoritesList (array: Offer[]): FavoritesListProps[] {
  const cityList = array
    .filter((item)=> item.isFavorite)
    .map((item) => item.city.name);

  const unicsCityList: string[] = [...new Set(cityList)];

  return unicsCityList.map((item) => ({
    favName: item,
    favList: array.filter((el) => item === el.city.name && el.isFavorite),
  }));
}

export default function App({Offers}: AppProps): JSX.Element {

  const isLoggedIn: loggedType = true;

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <MainPage Offers={Offers}/>
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/favorites" exact>
          <PrivetRoute
            isLoggedIn={isLoggedIn}
            favoritesList={getFavoritesList(Offers)}
          />
        </Route>
        <Route path="/offer/:id?" exact>
          <Property isLoggedIn={isLoggedIn} Offers={Offers}/>
        </Route>
        <Route>
          <Page404/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
