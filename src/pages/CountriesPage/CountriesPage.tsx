import React, { FC, useState } from "react";
import Countries from "../../components/Countries/Countries";
import { CountryRowProps } from "../../components/Country/Country";
import { DATASOURCE } from "../../constants";
import { useCountriesQuery } from "../../generated/graphql";
import CountryDetailsPage from "../CountryDetailsPage/CountryDetailsPage";
import { Box, Theme, Typography } from "@mui/material";
import "./CountriesPage.css";

interface CountriesPageProps {
  countries?: CountryRowProps[];
  loading?: boolean;
}

function escapeRegExp(value: string): string {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

interface QuickSearchToolbarProps {
  clearSearch: () => void;
  onChange: () => void;
  value: string;
}

const CountriesPage: FC<CountriesPageProps> = () => {
  const [searchParams, setSearchParams] = useState<any>({});
  const { data, isFetching, isError, fetchStatus } = useCountriesQuery(
    DATASOURCE,
    searchParams
  );
  // const [searched, setSearched] = useState<string>("");
  // const [rows, setRows] = useState<CountryRowProps[]>(data?.countries || []);
  // const classes = useStyles();

  // const requestSearch = (searchedVal: string) => {
  //   const filteredRows = data?.countries.filter((row) => {
  //     setSearchParams({
  //       dataSource: DATASOURCE,
  //       variables: {
  //         name: searchedVal,
  //       },
  //     });
  //     return row.name.toLowerCase().includes(searchedVal.toLowerCase());
  //   });
  //   setRows(filteredRows || []);
  // };

  // const cancelSearch = () => {
  //   setSearched("");
  //   requestSearch(searched);
  // };

  return (
    <>
      <Box
        sx={{ pt: 15, height: "100%" }}
        // sx={{ pt: 20, height: "100%", bgcolor: (theme: Theme) => theme.palette.grey[200] }}
        // className="CountriesPage"
        data-testid="CountriesPage"
      >
        <Typography sx={{ ml: "15%" }} variant="h4" component="h1" gutterBottom>
          Countries
        </Typography>
        {/* {isFetching && <p>Loading ...</p>} */}
        {/* {isError && <p>{JSON.stringify(fetchStatus)}</p>} */}
        <Countries loading={isFetching} countries={data?.countries || []} />
      </Box>
      <CountryDetailsPage />
    </>
  );
};

export default CountriesPage;
