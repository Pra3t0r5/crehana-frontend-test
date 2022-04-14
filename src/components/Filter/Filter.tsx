import React, { FC } from 'react';
import './Filter.css';

interface FilterProps {}

const Filter: FC<FilterProps> = () => (
  <div className="Filter" data-testid="Filter">
    Filter Component
  </div>
);

export default Filter;
