import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Country from './Country';

const countryA = {
  code: 'US',
  name: 'United States',
  native: 'United States',
  phone: '1',
  continent: {
    code: 'NA',
    name: 'North America',
  },
  currency:  'USD',
  languages: [
    {
      code: 'en',
      name: 'English',
      native: 'English',
      rtl: false,
    },
  ],
  emoji: '🇺🇸',
  emojiU: 'U+1F1FA U+1F1F8',
}

describe('<Country />', () => {
  test('it should mount', () => {
    render(<Country country={countryA} />);
    
    const country = screen.getByTestId('Country');

    expect(country).toBeInTheDocument();
  });
});