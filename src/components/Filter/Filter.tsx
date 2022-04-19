import { FC, useEffect, useState } from "react";
import {
  Box,
  Checkbox,
  FormControl,
  InputLabel,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import "./Filter.css";
import { useCountriesQuery } from "../../generated/graphql";
import { DATASOURCE } from "../../constants";
import { CountryRowProps } from "../Country/Country";
import { processCheckboxData } from "../../utils/filter.utils";

interface FilterProps {
  onFilter: (rows: CountryRowProps[]) => void;
  onLoading: (loading: boolean) => void;
  type: string;
}

export interface CheckboxData {
  values: ICheck[];
}
interface ICheck {
  key: string;
  value: boolean;
}

const Filter: FC<FilterProps> = ({ onFilter, onLoading, type }) => {
  const [searchParams, setSearchParams] = useState<any>({});
  const { data: filterData, isFetching } = useCountriesQuery(
    DATASOURCE,
    searchParams,
    {
      queryKey: ["filterParams" + type, searchParams],
    }
  );
  const [checkData, setCheckData] = useState<string[]>(
    processCheckboxData(filterData?.countries || [], type)
  );
  const [filterKeys, setFilterKeys] = useState<string[]>([]);

  const requestSearch = () => {
    let filter = {};
    if (filterKeys.length > 0) {
      filter = {
        [type]: { in: filterKeys },
      };
    }
    console.log(filter);
    setSearchParams({
      dataSource: DATASOURCE,
      filter,
    });
  };

  const handleChange = (event: SelectChangeEvent<typeof filterKeys>) => {
    const {
      target: { value },
    } = event;
    setFilterKeys(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  useEffect(() => {
    if (filterKeys) {
      requestSearch();
    }
  }, [JSON.stringify(filterKeys)]);

  useEffect(() => {
    if (filterData?.countries) {
      onFilter(filterData?.countries || []);
    }
  }, [JSON.stringify(filterData?.countries)]);

  useEffect(() => {
    onLoading(isFetching);
  }, [isFetching]);

  return (
    <>
      <FormControl sx={{ width: "100%" }}>
        <InputLabel id="demo-multiple-checkbox-label">{type}</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={filterKeys}
          onChange={handleChange}
          input={<OutlinedInput label={type} />}
          renderValue={(selected) => selected.join(", ")}
        >
          {checkData.map((key: string) => (
            <MenuItem key={key} value={key}>
              <Checkbox checked={filterKeys.includes(key)} />
              <ListItemText primary={key} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
    // <Box
    //   className="Filter"
    //   data-testid="Filter"
    //   style={{ maxHeight: 600, overflow: "auto" }}
    // >
    //   <>
    //     {checkData?.values?.map((obj: ICheck) => (
    //       <>
    //         <ListItem key={obj.key} disablePadding>
    //           <ListItemIcon>
    //             <Checkbox
    //               edge="start"
    //               checked={obj.value}
    //               tabIndex={-1}
    //               disableRipple
    //               inputProps={{ "aria-labelledby": obj.key }}
    //               value={obj.key}
    //               onChange={handleChange}
    //             />
    //           </ListItemIcon>
    //           <ListItemText id={obj.key} primary={obj.key} />
    //         </ListItem>
    //       </>
    //     ))}
    //   </>
    // </Box>
  );
};

export default Filter;
