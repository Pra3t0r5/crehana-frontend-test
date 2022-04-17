import React, { FC, useEffect, useState } from "react";
import {
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import "./Filter.css";
import { useCountriesQuery } from "../../generated/graphql";
import { DATASOURCE } from "../../constants";
import { CountryRowProps } from "../Country/Country";
import { StringifyOptions } from "querystring";

interface FilterProps {
  onFilter: (rows: CountryRowProps[]) => void;
  onLoading: (loading: boolean) => void;
  type: string;
}
interface CheckboxData {
  values: ICheck[];
}
interface ICheck {
  key: string;
  value: boolean;
}
interface FilteredProps {
  rows: (rows: CountryRowProps[]) => void;
  type: string;
}

// 1a creacion de atributos de checkboxes [{"AA":true}]
const generatedCheckData = (
  countries: any[] = [],
  type: string
): CheckboxData => {
  const DEFAULT_START = false;
  let keys: string[] = [];
  for (let country of countries) {
    let key;
    if (type === "currency" && !country.currency?.includes(null)) {
      key = country.currency;
    } else if (
      type === "continent" &&
      !country.continent?.code?.includes(null)
    ) {
      key = country.continent.code;
    }
    keys.push(key);
  }
  keys = keys.filter((value: string, index: number, array: string[]) => {
    return array.indexOf(value) === index;
  });
  const checkData = {
    // all: DEFAULT_START,
    values: keys.map((key: string) => ({ key, value: DEFAULT_START })),
  };
  console.log("generatedCheckData.checkData", checkData);
  return checkData;
};

const Filter: FC<FilterProps> = ({ onFilter, onLoading, type }) => {
  const [searchParams, setSearchParams] = useState<any>({});
  const { data: filterData, isFetching } = useCountriesQuery(
    DATASOURCE,
    searchParams,
    {
      queryKey: ["filterParams" + type, searchParams],
    }
  );

  const [checkData, setCheckData] = useState<CheckboxData>(
    generatedCheckData(filterData?.countries || [], type)
  );

  //2 seteo de checkboxdata como mapeo de busqueda
  const requestSearch = () => {
    const searchedArray = [];
    let filter = {};
    for (let chk of checkData.values) {
      if (chk.value) {
        searchedArray.push(chk.key);
      }
    }
    if (searchedArray.length > 0) {
      filter = {
        [type]: { in: searchedArray },
      };
    }
    setSearchParams({
      dataSource: DATASOURCE,
      filter,
    });
  };

  const handleChange = (event: any) => {
    const { checked, value: key } = event.target;
    const idx = checkData.values.findIndex(
      (check: ICheck) => check.key === key
    );
    if (idx !== -1) {
      setCheckData((prevState: any) => ({
        ...prevState,
        values: [
          ...prevState.values.slice(0, idx),
          { ...prevState.values[idx], value: checked },
          ...prevState.values.slice(idx + 1),
        ],
      }));
    }
  };

  //1b actualizacion de atributos de checkboxes
  useEffect(() => {
    if (checkData) {
      requestSearch();
      console.log("checkData.values", checkData.values);
    }
  }, [JSON.stringify(checkData.values)]);

  useEffect(() => {
    if (filterData?.countries) {
      onFilter(filterData?.countries || []);
    }
  }, [filterData?.countries]);

  useEffect(() => {
    onLoading(isFetching);
  }, [isFetching]);

  return (
    <Box
      className="Filter"
      data-testid="Filter"
      style={{ maxHeight: 600, overflow: "auto" }}
    >
      <>
        {/* <FormControlLabel
          label={type}
          control={
            <Checkbox checked={checkData.all} onChange={handleCheckAll} />
          }
        />*/}
        {checkData?.values?.map((obj: ICheck) => (
          <>
            <ListItem key={obj.key} disablePadding>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={obj.value}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": obj.key }}
                  value={obj.key}
                  onChange={handleChange}
                />
              </ListItemIcon>
              <ListItemText id={obj.key} primary={obj.key} />
            </ListItem>
          </>
        ))}
      </>
    </Box>
  );
};

export default Filter;
