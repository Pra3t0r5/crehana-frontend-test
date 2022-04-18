import React, { FC } from "react";
import { CountryRowProps } from "../Country/Country";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import "./Countries.css";

interface CountriesProps {
  countries?: CountryRowProps[];
  loading?: boolean;
}

function getColumns(): GridColDef[] {
  return [
    { field: "emoji", headerName: "Flag", flex: 0.05, align: "center" },
    { field: "code", headerName: "Code", flex: 0.07, align: "center" },
    { field: "name", headerName: "Name", flex: 0.5 },
    {
      field: "continent",
      headerName: "Continent",
      flex: 0.5,
      valueFormatter: ({ value }) => value.name,
    },
    { field: "currency", headerName: "Currency", flex: 0.2 },
  ];
}

const Countries: FC<CountriesProps> = ({ loading, countries }) => {
  const navigate = useNavigate();
  return (
    <Box
      className="Countries"
      data-testid="Countries"
      sx={{ width: "95%", margin: "auto", bgcolor: "white" }}
    >
      <DataGrid
        rows={countries || []}
        columns={getColumns()}
        pageSize={10}
        rowsPerPageOptions={[10]}
        getRowId={(row) => row.code}
        autoHeight
        loading={loading}
        onRowClick={({ id }) => navigate(`/country/` + id)}
      />
    </Box>
  );
};

export default Countries;
