import {
  initialStateOffers,
  offersData
} from './offers-data';
import {
  changeFavoriteCity,
  changeOfferSort,
  loadOffers
} from '../action';
import {FAKE_ARRAY_LENGTH} from '../../const';
import {
  getOffer,
  getOfferBackend
} from '../../utils/moks';
import {arrAdapter} from '../../services/adapter';

describe('Reducer: offersData', () => {
  it('without additional parameters should return initial state', () => {
    expect(offersData(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({...initialStateOffers});
  });

  it('should change offer sort', () =>  {
    expect(offersData(initialStateOffers, changeOfferSort('fakeSort')))
      .toEqual({...initialStateOffers, sortOfferBy: 'fakeSort'});
  });

  it('should add new offers', () => {
    const offers = new Array(FAKE_ARRAY_LENGTH).fill(getOffer());

    expect(offersData(initialStateOffers, loadOffers(offers)))
      .toEqual({...initialStateOffers, offers});
  });

  it('should change favorite in offer', () => {
    const offersBack = new Array(FAKE_ARRAY_LENGTH).fill('').map(()=> getOfferBackend());
    const [arrItemCopy, ...arrCopy] = offersBack.slice();
    const newArrItemCopy = {...arrItemCopy, 'is_favorite': !arrItemCopy.is_favorite};

    initialStateOffers.offers = arrAdapter(offersBack);

    expect(offersData(initialStateOffers, changeFavoriteCity(newArrItemCopy)))
      .toEqual({...initialStateOffers, offers: arrAdapter([newArrItemCopy,...arrCopy])});
  });
});
