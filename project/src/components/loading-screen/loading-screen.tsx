import React from 'react';

import './style.css';

export default function LoadingScreen(): JSX.Element {
  return (
    <div className='loader' data-testid="loader">
      <div className='loader__spinner-eclipse'>
        <div className='loader__spinner'>
          <div/>
        </div>
      </div>
      <img className='loader__logo'
        src='img/logo.svg'
        alt='6 cities logo'
        width='81'
        height='41'
      />
      <p className="loader__text">Loading ...</p>
    </div>
  );
}
