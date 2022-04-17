import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Countries from './Countries';

describe('<Countries />', () => {
  test('it should mount', () => {
    render(<Countries />);
    
    const countries = screen.getByTestId('Countries');

    expect(countries).toBeInTheDocument();
  });
});