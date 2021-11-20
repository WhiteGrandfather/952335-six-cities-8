import {
  loadNearby,
  loadPropertyData,
  loadReviews,
  resetProperty
} from '../action';
import {
  getOffer,
  getReview
} from '../../utils/moks';
import {
  initialStateProperty,
  propertyData
} from './property-data';
import {FAKE_ARRAY_LENGTH} from '../../const';

describe('Reducer: PropertyData', () => {
  it('without additional parameters should return initial state', () => {
    expect(propertyData(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({...initialStateProperty});
  });

  it('should load property offer', () => {
    const property = getOffer();

    expect(propertyData(initialStateProperty, loadPropertyData(property)))
      .toEqual({
        ...initialStateProperty,
        propertys: property,
      });
  });

  it('should load nearby offer array', () => {
    const nearby = new Array(FAKE_ARRAY_LENGTH).fill(getOffer());

    expect(propertyData(initialStateProperty, loadNearby(nearby)))
      .toEqual({
        ...initialStateProperty,
        nearby: nearby,
      });
  });

  it('should load nearby review array', () => {
    const reviews = new Array(FAKE_ARRAY_LENGTH).fill(getReview());

    expect(propertyData(initialStateProperty, loadReviews(reviews)))
      .toEqual({
        ...initialStateProperty,
        reviews,
      });
  });

  it('should reset state', () => {
    expect(propertyData(initialStateProperty, resetProperty))
      .toEqual(initialStateProperty);
  });
});
