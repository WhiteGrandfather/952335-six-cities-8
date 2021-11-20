import {render, screen} from '@testing-library/react';
import LoadingScreen from './loading-screen';

describe('Component: LoadingScreen', ()=>{
  it('should render correctly', () => {
    render(<LoadingScreen/>);

    expect(screen.getByTestId('loader')).toBeInTheDocument();
    expect(screen.getByAltText('6 cities logo')).toBeInTheDocument();
    expect(screen.getByText('Loading ...')).toBeInTheDocument();
  });
});
