import React from 'react';

import {AppProps} from './types';
import MainPage from '../main-page/main-page';

function App({placesNumber}: AppProps): JSX.Element {
  return <MainPage placesNumber={placesNumber}/>;
}

export default App;
