import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CountryDetailsPage from './CountryDetailsPage';

describe('<CountryDetailsPage />', () => {
  test('it should mount', () => {
    render(<CountryDetailsPage />);
    
    const countryDetailsPage = screen.getByTestId('CountryDetailsPage');

    expect(countryDetailsPage).toBeInTheDocument();
  });
});