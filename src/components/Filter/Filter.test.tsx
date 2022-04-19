import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Filter from "./Filter";
import { QueryClient, QueryClientProvider } from "react-query";
import renderer from 'react-test-renderer';

describe("<Filter />", () => {
  test("it should mount", () => {
    const queryClient = new QueryClient();
    const setRows = jest.fn();
    const setLoading = jest.fn();
    const type: string = "continent";
    const set = jest.fn();
    const searchParams = {};
    render(
      <QueryClientProvider contextSharing={true} client={queryClient}>
        <Filter
          onFilter={setRows}
          onLoading={setLoading}
          type={type}
          onSearchParamsChange={set}
          searchParams={searchParams}
        />
      </QueryClientProvider>
    );

    const filter = screen.getByTestId("Filter");

    expect(filter).toBeInTheDocument();
  });
  test('it should match snapshot', () => {
    const queryClient = new QueryClient();
    const setRows = jest.fn();
    const setLoading = jest.fn();
    const type: string = "continent";
    const set = jest.fn();
    const searchParams = {};
    const tree = renderer.create(
      <QueryClientProvider contextSharing={true} client={queryClient}>
        <Filter
          onFilter={setRows}
          onLoading={setLoading}
          type={type}
          onSearchParamsChange={set}
          searchParams={searchParams}
        />
      </QueryClientProvider>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
