import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Filter from "./Filter";

describe("<Filter />", () => {
  test("it should mount", () => {
    const setRows = jest.fn();
    const setLoading = jest.fn();
    // const mock: any[] = [];
    const type: string = "continent";

    render(<Filter onFilter={setRows} onLoading={setLoading} type={type} />);

    const filter = screen.getByTestId("Filter");

    expect(filter).toBeInTheDocument();
  });
});
