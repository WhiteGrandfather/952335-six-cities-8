import React from 'react';
import {
  useDispatch,
  useSelector
} from 'react-redux';

import {changeCurrentCity} from '../../store/action';
import {getCurrentCity} from '../../store/city-process/selector';
import {CITY_LIST} from '../../const';

function TabsList():JSX.Element {
  const currentCity = useSelector(getCurrentCity);

  const dispatch = useDispatch();

  const cityList: JSX.Element[] = CITY_LIST.map((item)=> {
    const isActive: string = currentCity === item ?'tabs__item--active':'';

    return (
      <li className='locations__item'
        key={`ct-${item}`}
      >
        <a className={`locations__item-link tabs__item ${isActive}`}
          onClick={()=>dispatch(changeCurrentCity(item))}
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

export default TabsList;
