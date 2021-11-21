import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import {Router} from 'react-router-dom';
import {
  Provider,
  RootStateOrAny
} from 'react-redux';
import {
  render,
  screen
} from '@testing-library/react';

import {
  AppRoute,
  AuthorizationStatus,
  CITY_LIST,
  FAKE_ARRAY_LENGTH,
  SortBy
} from '../../const';
import {
  getCity,
  getOfferBackend
} from '../../utils/moks';
import App from './app';
import {adapter} from '../../services/adapter';
import {initialStateCity} from '../../store/city-process/city-pocess';
import {initialStateProperty} from '../../store/property-data/property-data';
import {initialStateUser} from '../../store/user-process/user-process';
import thunk from 'redux-thunk';

const mockStore = configureMockStore([thunk]);
const history = createMemoryHistory();

const backendOffers = new Array(FAKE_ARRAY_LENGTH)
  .fill(null)
  .map(()=>getOfferBackend());

const offers = new Array(FAKE_ARRAY_LENGTH)
  .fill(getCity())
  .map((city, n)=>{
    const offer = adapter(backendOffers[n]);
    city.name = CITY_LIST[0];
    offer.city = city;
    return offer;
  });

const store = mockStore({
  CITY: initialStateCity,
  DATA: {
    sortOfferBy: SortBy.Default,
    offers,
  },
  USER: {
    isDataLoaded: true,
    authorizationStatus: AuthorizationStatus.NoAuth,
    favoritesCity: [],
    authInfo: initialStateUser,
  },
  PROPERTY: initialStateProperty,
});

const fakeApp = (state: RootStateOrAny = store) => (
  <Provider store={state}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
);

const checkMainPageRender = () => {
  expect(screen.getByText(`${offers.length} places to stay in ${CITY_LIST[0]}`)).toBeInTheDocument();
  expect(screen.getByTestId('main-page')).toBeInTheDocument();
  expect(screen.getByTestId('sort-list')).toBeInTheDocument();
  expect(screen.getByTestId('map')).toBeInTheDocument();
};

describe('Application Routing', () => {
  beforeEach(() => history.push('/bad-path'));

  it('should render "MainPage" when navigating to "/"', () => {
    history.push(AppRoute.Root);
    render(fakeApp());

    checkMainPageRender();
  });

  it('should render Login page when navigating to "/login" without authorization', () => {
    history.replace(AppRoute.Login);
    render(fakeApp());

    expect(screen.getByTestId('login')).toBeInTheDocument();
    expect(screen.getByTestId('email')).toBeInTheDocument();
    expect(screen.getByTestId('password')).toBeInTheDocument();
  });

  it('should render "MainPage" when navigating to "/login" with authorization', () => {
    history.replace(AppRoute.Login);
    const notAuthState = mockStore({
      CITY: initialStateCity,
      DATA: {
        sortOfferBy: SortBy.Default,
        offers,
      },
      USER: {
        isDataLoaded: true,
        authorizationStatus: AuthorizationStatus.Auth,
        favoritesCity: [],
        authInfo: initialStateUser,
      },
      PROPERTY: initialStateProperty,
    });

    render(fakeApp(notAuthState));

    checkMainPageRender();
    expect(screen.queryByTestId('login')).not.toBeInTheDocument();
    expect(screen.queryByTestId('email')).not.toBeInTheDocument();
    expect(screen.queryByTestId('password')).not.toBeInTheDocument();
  });

  it('should render "NotFoundPage" when user navigates to non-existent-route', () => {
    history.push('/404-non-existent-route');

    const storeUser = mockStore({
      USER: {
        isDataLoaded: true,
        authInfo: initialStateUser,
        authorizationStatus: AuthorizationStatus.NoAuth,
      },
    });

    render(fakeApp(storeUser));

    expect(screen.getByTestId('page404')).toBeInTheDocument();
    expect(screen.getByText(/Page not found/i)).toBeInTheDocument();
    expect(screen.getByText('Go to main page')).toBeInTheDocument();
  });
});
