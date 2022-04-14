import React, { lazy, Suspense } from 'react';

const LazyCountriesPage = lazy(() => import('./CountriesPage'));

const CountriesPage = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyCountriesPage {...props} />
  </Suspense>
);

export default CountriesPage;
