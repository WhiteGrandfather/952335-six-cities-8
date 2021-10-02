import React from 'react';
import MainPage from '../main-page/main-page';

type AppProps = {
  placesNumber: number
}

function App({placesNumber}: AppProps): JSX.Element {
  return <MainPage placesNumber={placesNumber}/>;
}

export default App;
