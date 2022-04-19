import { FC, useState } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import Countries from "../../components/Countries/Countries";
import Search from "../../components/Search/Search";
import Filter from "../../components/Filter/Filter";
import { CountriesPageProps, CountryRowProps } from "../../model";

const CountriesPage: FC<CountriesPageProps> = () => {
  const [searchParams, setSearchParams] = useState<any>({});
  const [rows, setRows] = useState<CountryRowProps[]>([]);
  const [loading, setLoading] = useState<boolean>();

  const handleOnComplete = (newRows: CountryRowProps[]) => {
    setRows(newRows);
  };

  const handleSearchChange = (newParams: any) => {
    setSearchParams((prevState: typeof searchParams) => {
      return {
        ...prevState,
        filter: {
          ...prevState.filter,
          ...newParams,
        },
      };
    });
  };

  return (
    <>
      <Grid
        sx={{ pt: 10 }}
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        <Grid item xs={2} md={2}>
          <Typography
            sx={{ ml: "25%" }}
            variant="h4"
            component="h1"
            gutterBottom
          >
            Countries
          </Typography>
        </Grid>
        <Grid item xs={4} md={4}>
          <Search
            searchParams={searchParams}
            onSearchParamsChange={handleSearchChange}
            onComplete={handleOnComplete}
            onLoading={setLoading}
          />
        </Grid>
        <Grid item xs={2} md={2}>
          {rows.length && (
            <Filter
              type={"currency"}
              searchParams={searchParams}
              onFilter={handleOnComplete}
              onLoading={setLoading}
              onSearchParamsChange={handleSearchChange}
            />
          )}
        </Grid>
        <Grid item xs={2} md={2}>
          {rows.length && (
            <Filter
              type={"continent"}
              searchParams={searchParams}
              onFilter={handleOnComplete}
              onLoading={setLoading}
              onSearchParamsChange={handleSearchChange}
            />
          )}
        </Grid>
      </Grid>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <Countries loading={loading} countries={rows} />
        </Container>
      </Box>
    </>
  );
};

export default CountriesPage;
