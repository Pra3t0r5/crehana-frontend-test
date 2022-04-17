import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Countries from "./Countries";
import { CountryRowProps } from "../Country/Country";

describe("<Countries />", () => {
  test("it should mount", () => {
    const rows: CountryRowProps[] = [];
    const loading: boolean = true;
    render(<Countries loading={loading} countries={rows} />);

    const countries = screen.getByTestId("Countries");

    expect(countries).toBeInTheDocument();
  });
});
