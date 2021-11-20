import {render} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';

import Page404 from './page404';
import {getAuthInfo} from '../../utils/moks';
import {AuthorizationStatus} from '../../const';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: Page404', () => {
  beforeEach(() => history.push('/bad-path'));

  it('should render correctly', () => {
    const state = mockStore(()=> ({
      USER: {
        authInfo: getAuthInfo(),
        authorizationStatus: AuthorizationStatus.Auth,
      },
    }));

    const elems = render(
      <Provider store={state}>
        <Router history={history}>
          <Page404 />
        </Router>,
      </Provider>,
    );

    const headerId = elems.getByTestId('page404');
    const headerTitle = elems.getByText(/Go to main page/i);
    const link = elems.getByRole('link', {name: 'Go to main page'});

    expect(headerId).toBeInTheDocument();
    expect(headerTitle).toBeInTheDocument();
    expect(link).toBeInTheDocument();
  });
});
