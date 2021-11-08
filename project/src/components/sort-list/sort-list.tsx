import React, {useState} from 'react';
import {
  useDispatch,
  useSelector
} from 'react-redux';

import {changeOfferSort} from '../../store/action';
import {getSortOfferBy} from '../../store/offers-data/selector';
import {SortBy} from '../../const';

const TAB_INDEX = 0;
const SORT_ITEMS: string[] = [
  SortBy.Default,
  SortBy.LowPrice,
  SortBy.HighPrice,
  SortBy.TopRated,
];

function SortList(): JSX.Element {
  const sortOfferBy = useSelector(getSortOfferBy);
  const dispatch = useDispatch();

  const [showList, setShowList] = useState<boolean>(false);
  return (
    <form className="places__sorting"
      action="#"
      method="get"
    >
      <span className="places__sorting-caption">Sort by </span>
      <span className="places__sorting-type"
        tabIndex={TAB_INDEX}
        onClick={()=>setShowList(true)}
      >
        {sortOfferBy}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"/>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${showList?'places__options--opened':''}`}>
        {SORT_ITEMS.map((item) => (
          <li className={`places__option ${sortOfferBy===item?'places__option--active':''}`}
            tabIndex={TAB_INDEX}
            onClick={()=>{
              dispatch(changeOfferSort(item));
              setShowList(false);
            }}
            key={`sort-${item}`}
          >
            {item}
          </li>
        ))}
      </ul>
    </form>

  );
}

export default SortList;
