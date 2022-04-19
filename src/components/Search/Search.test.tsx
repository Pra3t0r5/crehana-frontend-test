import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Search from "./Search";

describe("<Search />", () => {
  test("it should mount", () => {
    const setRows = jest.fn();
    const setLoading = jest.fn();
    const set = jest.fn();
    const searchParams= {};
    render(
      <Search
        onComplete={setRows}
        onLoading={setLoading}
        onSearchParamsChange={set}
        searchParams={searchParams}
      />
    );

    const search = screen.getByTestId("Search");

    expect(search).toBeInTheDocument();
  });
});
