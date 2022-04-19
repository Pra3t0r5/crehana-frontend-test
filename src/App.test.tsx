import { render, screen } from "@testing-library/react";
import App from "./App";
import { MemoryRouter } from "react-router-dom";
import LazyCountriesPage from "./pages/CountriesPage/CountriesPage.lazy";
import { QueryClient, QueryClientProvider } from "react-query";

test("Should render", () => {
  render(<App />);
  const rootComponent = screen.getByTestId("App");
  expect(rootComponent).toBeInTheDocument();
});

test("Initial route has rendered", () => {
  const queryClient = new QueryClient();

  render(
    <MemoryRouter initialEntries={["/"]}>
      <QueryClientProvider contextSharing={true} client={queryClient}>
        <LazyCountriesPage />
      </QueryClientProvider>
    </MemoryRouter>
  );
  const firstRoute = screen.getByTestId("CountriesPage");

  expect(firstRoute).toBeInTheDocument();
});
