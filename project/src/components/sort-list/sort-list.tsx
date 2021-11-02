import React, {Dispatch, useState} from 'react';
import {State} from '../../types/state';
import {connect, ConnectedProps} from 'react-redux';
import {Actions} from '../../types/action';
import {changeOfferSort} from '../../store/action';
import {SortBy} from '../../const';

const TAB_INDEX = 0;
const SORT_ITEMS: string[] = [
  SortBy.Default,
  SortBy.LowPrice,
  SortBy.HighPrice,
  SortBy.TopRated,
];

const mapStateToProps = ({sortOfferBy}: State )=> ({
  sortOfferBy,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => ({
  onSortClick(item: string) {
    dispatch(changeOfferSort(item));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux =ConnectedProps<typeof connector>;

function SortList({sortOfferBy, onSortClick}: PropsFromRedux): JSX.Element {
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
              onSortClick(item);
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

export {SortList};
export default connector(SortList);
