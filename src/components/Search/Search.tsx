import { FC, useEffect, useState } from "react";
import { Box, IconButton, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { useCountriesQuery } from "../../generated/graphql";
import { DATASOURCE } from "../../constants";
import { CountryRowProps } from "../Country/Country";
import "./Search.css";

export interface SearchProps {
  onLoading: (loading: boolean) => void;
  onComplete: (rows: CountryRowProps[]) => void;
}

function escapeRegExp(value: string): string {
  return value.replace(/[^\w_]/g, "");
}

const Search: FC<SearchProps> = ({ onLoading, onComplete }) => {
  const [searched, setSearched] = useState<string>("");
  const [searchParams, setSearchParams] = useState<any>({});
  const { data, isFetching } = useCountriesQuery(DATASOURCE, searchParams, {
    queryKey: ["searchParams", searchParams],
  });

  const requestSearch = (searchedVal: string) => {
    setSearchParams({
      dataSource: DATASOURCE,
      filter: {
        code: { regex: searchedVal },
      },
    });
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
        ml: "10%",
        p: 0.5,
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
