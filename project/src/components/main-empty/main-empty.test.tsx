import {render, screen} from '@testing-library/react';
import MainEmpty from './main-empty';
import {address} from 'faker';

describe('Component: MainEmpty', () => {
  it('should render correctly', () => {
    const cityName = address.cityName();

    render(<MainEmpty city={cityName}/>);
    expect(screen.getByTestId('main-empty')).toBeInTheDocument();
    expect(screen.getByText(cityName, {exact: false})).toBeInTheDocument();
  });
});
