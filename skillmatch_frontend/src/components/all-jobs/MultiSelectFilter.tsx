import {
  Autocomplete,
  AutocompleteProps,
  FormControl,
  Slider,
  SliderProps,
  TextField,
  styled,
} from "@mui/material";
import { filterStyles } from "./styles/filterStyles";

interface Props {
  label: string;
  options: string[];
  handleChange: (selection: string[]) => void;
}

const StyledFormControl = styled(FormControl)`
  ${filterStyles}
`;

const MultiSelectFilter = ({ label, options, handleChange }: Props) => {
  return (
    <StyledFormControl fullWidth>
      <Autocomplete
        multiple
        limitTags={3}
        options={options}
        filterSelectedOptions
        renderInput={(params) => (
          <TextField {...params} label={label} placeholder={label} />
        )}
        onChange={(event, value) => handleChange(value)}
      ></Autocomplete>
    </StyledFormControl>
  );
};

export default MultiSelectFilter;
