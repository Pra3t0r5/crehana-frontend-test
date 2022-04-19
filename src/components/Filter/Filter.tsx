import { FC, useEffect, useState } from "react";
import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useCountriesQuery } from "../../generated/graphql";
import { DATASOURCE } from "../../constants";
import { processCheckboxData } from "../../utils/filter.utils";
import { FilterProps } from "../../model";

const Filter: FC<FilterProps> = ({
  onSearchParamsChange,
  searchParams,
  onFilter,
  onLoading,
  type,
}) => {
  const { data: filterData, isFetching } = useCountriesQuery(
    DATASOURCE,
    searchParams,
    {
      queryKey: ["filterParams" + type, searchParams],
    }
  );
  const [checkData] = useState<string[]>(
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
    onSearchParamsChange(filter);
  };

  const handleChange = (event: SelectChangeEvent<typeof filterKeys>) => {
    const {
      target: { value },
    } = event;
    setFilterKeys(typeof value === "string" ? value.split(",") : value);
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
      <FormControl sx={{ width: "100%" }} data-testid="Filter">
        <InputLabel>{type}</InputLabel>
        <Select
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
  );
};

export default Filter;
