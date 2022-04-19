import { QueryClient, QueryClientProvider } from "react-query";
import LazyCountriesPage from "./pages/CountriesPage/CountriesPage.lazy";
import LazyCountryDetailsPage from "./pages/CountryDetailsPage/CountryDetailsPage.lazy";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./theme";

const queryClient = new QueryClient();

function App() {
  return (
    <div data-testid="App">
    <ThemeProvider theme={theme}>
    <QueryClientProvider contextSharing={true} client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LazyCountriesPage />} />
          <Route path="/country/:code" element={<LazyCountryDetailsPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
    </ThemeProvider>
    </div>
  );
}

export default App;
