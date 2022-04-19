import { FC } from "react";
import { DataGrid, GridColDef, GridRowId } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { PATH } from "../../constants";
import "./Countries.css";
import { CountriesProps } from "../../model";

function getColumns(): GridColDef[] {
  return [
    {
      field: "emoji",
      headerName: "Flag",
      headerClassName: "countries-header",
      flex: 0.05,
      align: "center",
    },
    {
      field: "code",
      headerName: "Code",
      headerClassName: "countries-header",
      flex: 0.07,
      align: "center",
    },
    {
      field: "name",
      headerName: "Name",
      headerClassName: "countries-header",
      flex: 0.5,
    },
    {
      field: "native",
      headerName: "Native Name",
      headerClassName: "countries-header",
      flex: 0.5,
    },
    {
      field: "continent",
      headerName: "Continent",
      headerClassName: "countries-header",
      flex: 0.3,
      valueFormatter: ({ value }) => value.name,
    },
    {
      field: "capital",
      headerName: "Capital",
      headerClassName: "countries-header",
      flex: 0.3,
    },
    {
      field: "languages",
      headerName: "Languages",
      headerClassName: "countries-header",
      flex: 0.3,
      valueFormatter: ({ value }) =>
        value.map(({ name }: { name: string }) => name).join(", "),
    },
    {
      field: "currency",
      headerName: "Currency",
      headerClassName: "countries-header",
      flex: 0.3,
    },
  ];
}

const Countries: FC<CountriesProps> = ({ loading, countries }) => {
  const navigate = useNavigate();

  const handleNavigate = ({ id }: { id: GridRowId }) => {
    navigate(`${PATH.COUNTRY}/${id}`);
  };

  return (
    <Box
      className="Countries"
      data-testid="Countries"
      sx={{ width: "95%", margin: "auto", bgcolor: "white" }}
    >
      <DataGrid
        rows={countries || []}
        columns={getColumns()}
        pageSize={12}
        rowsPerPageOptions={[12]}
        getRowId={(row) => row.code}
        autoHeight
        loading={loading}
        onRowClick={handleNavigate}
      />
    </Box>
  );
};

export default Countries;
