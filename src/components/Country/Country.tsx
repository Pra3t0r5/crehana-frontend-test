import React, { FC } from 'react';
import './Country.css';

interface CountryProps {}

const Country: FC<CountryProps> = () => (
  <div className="Country" data-testid="Country">
    Country Component
  </div>
);

export default Country;
