import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Country from './Country';

describe('<Country />', () => {
  test('it should mount', () => {
    render(<Country />);
    
    const country = screen.getByTestId('Country');

    expect(country).toBeInTheDocument();
  });
});