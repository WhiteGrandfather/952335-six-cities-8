import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app/app';
import {Offers} from './mocks/offers';

ReactDOM.render(
  <React.StrictMode>
    <App Offers={Offers}/>
  </React.StrictMode>,
  document.getElementById('root'));
