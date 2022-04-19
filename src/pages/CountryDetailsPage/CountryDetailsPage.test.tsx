import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CountryDetailsPage from './CountryDetailsPage';
import { QueryClient, QueryClientProvider } from "react-query";

describe('<CountryDetailsPage />', () => {
  test('it should mount', () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider contextSharing={true} client={queryClient}>
        <CountryDetailsPage />
      </QueryClientProvider>
    );

    const countryDetailsPage = screen.getByTestId('CountryDetailsPage');

    expect(countryDetailsPage).toBeInTheDocument();
  });
});