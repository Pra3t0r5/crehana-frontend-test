import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CountriesPage from './CountriesPage';

describe('<CountriesPage />', () => {
  test('it should mount', () => {
    render(<CountriesPage />);
    
    const countriesPage = screen.getByTestId('CountriesPage');

    expect(countriesPage).toBeInTheDocument();
  });
});