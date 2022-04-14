import React, { FC } from 'react';
import './Search.css';

interface SearchProps {}

const Search: FC<SearchProps> = () => (
  <div className="Search" data-testid="Search">
    Search Component
  </div>
);

export default Search;