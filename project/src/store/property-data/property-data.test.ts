import {ActionType} from '../../types/action';
import {getOffer} from '../../utils/moks';
import {
  initialState,
  propertyData
} from './property-data';

describe('Reducer: PropertyData', () => {
  it('should load property offer', () => {
    const property = getOffer();
    const loadPropertyData = {
      type: ActionType.LoadPropertyData,
      payload: property,
    };

    expect(propertyData(initialState, loadPropertyData))
      .toEqual();
  });
});
