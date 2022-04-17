import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import LazyCountriesPage from "./pages/CountriesPage/CountriesPage.lazy";
import LazyCountryDetailsPage from "./pages/CountryDetailsPage/CountryDetailsPage.lazy";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LazyCountriesPage />} />
            <Route path="/country/:code" element={<LazyCountryDetailsPage />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
  );
}

export default App;
