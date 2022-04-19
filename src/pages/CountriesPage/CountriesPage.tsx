import { FC, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import Countries from "../../components/Countries/Countries";
import { CountryRowProps } from "../../components/Country/Country";
import Search from "../../components/Search/Search";
import Filter from "../../components/Filter/Filter";
import "./CountriesPage.css";

interface CountriesPageProps {}

const CountriesPage: FC<CountriesPageProps> = () => {
  const [rows, setRows] = useState<CountryRowProps[]>([]);
  const [loading, setLoading] = useState<boolean>();

  const handleOnComplete = (newRows: CountryRowProps[]) => {
    setRows((prevRows) => {
      if (prevRows.length !== 0) {
        const result = prevRows.filter((e) => {
          return newRows.some((item) => item.code === e.code);
        });
        return result;
      } else {
        return newRows;
      }
    });
  };

  return (
    <>
      <Box sx={{ pt: 15, height: "100%" }} data-testid="CountriesPage">
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={8}>
            <Typography
              sx={{ ml: "10%" }}
              variant="h4"
              component="h1"
              gutterBottom
            >
              Countries
            </Typography>
            <Search onComplete={handleOnComplete} onLoading={setLoading} />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="h5" component="h1" gutterBottom>
              Currencies
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="h5" component="h1" gutterBottom>
              Continents
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Countries loading={loading} countries={rows} />
          </Grid>
          <Grid item xs={2}>
            {rows.length && (
              <Filter
                onFilter={handleOnComplete}
                onLoading={setLoading}
                type={"currency"}
              />
            )}
          </Grid>
          <Grid item xs={2}>
            {rows.length && (
              <Filter
                onFilter={handleOnComplete}
                onLoading={setLoading}
                type={"continent"}
              />
            )}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default CountriesPage;
