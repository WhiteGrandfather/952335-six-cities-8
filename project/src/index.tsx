import React from 'react';
import ReactDOM from 'react-dom';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {Provider} from 'react-redux';

import App from './components/app/app';
import {arrAdapter} from './services/adapter';
import {
  addOffers,
  changeCurrentCity,
  changeOfferSort
} from './store/action';
import {reducer} from './store/reducer';
import {createAPI} from './services/api';
import {Offer} from './types/offer-type';

const store = createStore(
  reducer,
  composeWithDevTools(),
);


let offerList: Offer[] | [] = [];

createAPI().then((response) => {
  offerList = arrAdapter(response);

  store.dispatch(addOffers(offerList));
} );

store.dispatch(changeCurrentCity('Paris'));
store.dispatch(changeOfferSort('Popular'));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>,

  document.getElementById('root'));
