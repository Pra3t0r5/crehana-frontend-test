import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import CountriesPage from "./CountriesPage";
import { QueryClient, QueryClientProvider } from "react-query";

describe("<CountriesPage />", () => {
  test("it should mount", () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider contextSharing={true} client={queryClient}>
        <CountriesPage />
      </QueryClientProvider>
    );

    const countriesPage = screen.getByTestId("CountriesPage");

    expect(countriesPage).toBeInTheDocument();
  });
});
