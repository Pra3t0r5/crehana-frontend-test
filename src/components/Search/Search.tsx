import { FC, useEffect, useState } from "react";
import { Box, IconButton, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { useCountriesQuery } from "../../generated/graphql";
import { DATASOURCE } from "../../constants";
import { CountryRowProps } from "../Country/Country";
import "./Search.css";
import { SearchProps } from "../../pages/CountriesPage/CountriesPage";

export interface SearchBarProps extends SearchProps {
  onLoading: (loading: boolean) => void;
  onComplete: (rows: CountryRowProps[]) => void;
}

function escapeRegExp(value: string): string {
  return value.replace(/[^\w_]/g, "");
}

const Search: FC<SearchBarProps> = ({ onSearchParamsChange, searchParams, onLoading, onComplete }) => {
  const [searched, setSearched] = useState<string>("");
  const { data, isFetching } = useCountriesQuery(
    DATASOURCE,
    searchParams,
    {
      queryKey: ["searchParams", JSON.stringify(searchParams)],
    }
  );

  const requestSearch = (searchedVal: string) => {
    const filter= {
      code: { regex: searchedVal },
    };
    onSearchParamsChange(filter);
    setSearched(searchedVal);
  };

  const handleTextInputChange = (event: any) => {
    const escaped = escapeRegExp(event.target.value);
    setSearched(escaped);
    requestSearch(escaped);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch("");
  };

  useEffect(() => {
    if (data?.countries) {
      onComplete(data?.countries || []);
    }
  }, [data?.countries]);

  useEffect(() => {
    onLoading(isFetching);
  }, [isFetching]);

  return (
    <Box
      className="Search"
      data-testid="Search"
      sx={{
        pb: 0,
      }}
    >
      <TextField
        variant="standard"
        value={searched}
        onChange={handleTextInputChange}
        placeholder="Search…"
        InputProps={{
          startAdornment: <SearchIcon fontSize="small" />,
          endAdornment: (
            <IconButton
              title="Clear"
              aria-label="Clear"
              size="small"
              style={{ visibility: searched ? "visible" : "hidden" }}
              onClick={cancelSearch}
            >
              <ClearIcon fontSize="small" />
            </IconButton>
          ),
        }}
        sx={{
          width: {
            xs: 1,
            sm: "auto",
          },
          m: (theme) => theme.spacing(1, 0.5, 1.5),
          "& .MuiSvgIcon-root": {
            mr: 0.5,
          },
          "& .MuiInput-underline:before": {
            borderBottom: 1,
            borderColor: "divider",
          },
        }}
      />
    </Box>
  );
};

export default Search;
