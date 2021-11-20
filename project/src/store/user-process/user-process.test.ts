import {
  AuthorizationStatus,
  FAKE_ARRAY_LENGTH
} from '../../const';
import {
  initialStateUser,
  userProcess
} from './user-process';
import {ActionType} from '../../types/action';
import {authInfoAdapter} from '../../services/adapter';
import {
  getOffer,
  getUserBackend
} from '../../utils/moks';

describe('Reducer: UserProcess', () => {
  it('without additional parameters should return initial state', () => {
    expect(userProcess(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({...initialStateUser});
  });

  it('should update authorisationStatus to "AUTH', () => {
    const requireAuthorisation = {
      type: ActionType.RequireAuthorization,
      payload: AuthorizationStatus.Auth,
    };
    expect(userProcess(initialStateUser, requireAuthorisation))
      .toEqual({
        ...initialStateUser,
        authorizationStatus: AuthorizationStatus.Auth,
        isDataLoaded: true,
      });
  });

  it('loadFavorites', () => {
    const requireLogout = {
      type: ActionType.RequireLogout,
      payload: AuthorizationStatus.NoAuth,
    };
    expect(userProcess(initialStateUser, requireLogout))
      .toEqual({...initialStateUser, authorizationStatus: AuthorizationStatus.NoAuth});
  });

  it('should add user authorization info', () => {
    const authInfo = getUserBackend();
    const addAuthInfo = {
      type: ActionType.AddAuthInfo,
      payload: authInfo,
    };

    expect(userProcess(initialStateUser, addAuthInfo))
      .toEqual({
        ...initialStateUser,
        authInfo: authInfoAdapter(authInfo),
      });
  });

  it('should update favoritesCity array', () => {
    const favoritesCity = new Array(FAKE_ARRAY_LENGTH).fill(getOffer());
    const  loadFavorites = {
      type: ActionType.LoadFavorites,
      payload: favoritesCity,
    };

    expect(userProcess(initialStateUser, loadFavorites))
      .toEqual({...initialStateUser, favoritesCity: favoritesCity});
  });
});
