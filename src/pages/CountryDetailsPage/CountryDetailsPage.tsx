import { FC } from "react";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import Country from "../../components/Country/Country";
import { useCountryQuery } from "../../generated/graphql";
import { DATASOURCE } from "../../constants";
import { CountryDetailsPageProps } from "../../model";
import "./CountryDetailsPage.css";

const CountryDetailsPage: FC<CountryDetailsPageProps> = () => {
  const { code = " " } = useParams();
  const { data } = useCountryQuery(DATASOURCE, { code });
  return (
    <Box
      className="CountryDetailsPage"
      data-testid="CountryDetailsPage"
      sx={{ pt: 15, height: "100%" }}
    >
      {data?.country && <Country country={data?.country} />}
    </Box>
  );
};

export default CountryDetailsPage;
