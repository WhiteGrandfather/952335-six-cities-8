import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {Provider} from 'react-redux';

import App from './components/app/app';
import {Offers} from './mocks/offers';
import {
  AddOffers,
  ChangeCurrentCity,
  ChangeOfferSort
} from './store/action';
import {reducer} from './store/reducer';

const store = createStore(
  reducer,
  composeWithDevTools(),
);

store.dispatch(AddOffers(Offers));
// store.dispatch(ChangeCurrentCity('Paris'));
store.dispatch(ChangeCurrentCity('Amsterdam'));
store.dispatch(ChangeOfferSort('Popular'));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>

      <App Offers={Offers}/>

    </Provider>
  </React.StrictMode>,

  document.getElementById('root'));
