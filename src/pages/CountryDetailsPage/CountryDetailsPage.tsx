import React, { FC } from "react";
import { Box, Theme } from "@mui/material";
import { useParams } from "react-router-dom";
import Country from "../../components/Country/Country";
import { DATASOURCE } from "../../constants";
import { useCountryQuery } from "../../generated/graphql";
import "./CountryDetailsPage.css";

interface CountryDetailsPageProps {}

const CountryDetailsPage: FC<CountryDetailsPageProps> = () => {
  const { code = " " } = useParams();
  const { data } = useCountryQuery(DATASOURCE, { code });
  return (
    // <Box sx={{ bgcolor: (theme: Theme) => theme.palette.grey[200] }}>
    <Box sx={{ pt: 15, height: "100%" }}>
      {data?.country && <Country country={data?.country} />}
    </Box>
  );
};

export default CountryDetailsPage;
