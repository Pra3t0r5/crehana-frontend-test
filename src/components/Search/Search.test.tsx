import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Search from "./Search";
import { QueryClient, QueryClientProvider } from "react-query";
import renderer from 'react-test-renderer';

describe("<Search />", () => {
  test("it should mount", () => {
    const queryClient = new QueryClient();
    const setRows = jest.fn();
    const setLoading = jest.fn();
    const set = jest.fn();
    const searchParams = {};
    render(
      <QueryClientProvider contextSharing={true} client={queryClient}>
        <Search
          onComplete={setRows}
          onLoading={setLoading}
          onSearchParamsChange={set}
          searchParams={searchParams}
        />
      </QueryClientProvider>
    );

    const search = screen.getByTestId("Search");

    expect(search).toBeInTheDocument();
  });

  test("it should match snapshot", () => {
    const queryClient = new QueryClient();
    const setRows = jest.fn();
    const setLoading = jest.fn();
    const set = jest.fn();
    const searchParams = {};
    const tree = renderer.create(
      <QueryClientProvider contextSharing={true} client={queryClient}>
        <Search
          onComplete={setRows}
          onLoading={setLoading}
          onSearchParamsChange={set}
          searchParams={searchParams}
        />
      </QueryClientProvider>
      ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
