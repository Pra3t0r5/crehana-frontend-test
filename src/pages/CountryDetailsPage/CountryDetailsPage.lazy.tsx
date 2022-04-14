import React, { lazy, Suspense } from 'react';

const LazyCountryDetailsPage = lazy(() => import('./CountryDetailsPage'));

const CountryDetailsPage = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyCountryDetailsPage {...props} />
  </Suspense>
);

export default CountryDetailsPage;
