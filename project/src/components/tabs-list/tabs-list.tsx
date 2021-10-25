import React, {Dispatch} from 'react';
import {State} from '../../types/state';
import {
  connect,
  ConnectedProps
} from 'react-redux';

import {Actions} from '../../types/action';
import {ChangeCurrentCity} from '../../store/action';

const CITY_LIST: string[] = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
];

const mapStateToProps = ({currentCity}: State) => ({
  currentCity,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => ({
  onCityClick(item: string) {
    dispatch(ChangeCurrentCity(item));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>

function TabsList({currentCity, onCityClick}:PropsFromRedux):JSX.Element {

  const cityList: JSX.Element[] = CITY_LIST.map((item)=> {
    const isActive: string = currentCity === item ?'tabs__item--active':'';

    return (
      <li className='locations__item'
        key={`ct-${item}`}
      >
        <a className={`locations__item-link tabs__item ${isActive}`}
          onClick={()=>onCityClick(item)}
        >
          <span>{item}</span>
        </a>
      </li>
    );
  });

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {cityList}
        </ul>
      </section>
    </div>
  );
}

export {TabsList};
export default connector(TabsList);
