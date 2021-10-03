import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

const placesNumber = 5;

ReactDOM.render(
  <React.StrictMode>
    <App placesNumber={placesNumber}/>
  </React.StrictMode>,
  document.getElementById('root'));
