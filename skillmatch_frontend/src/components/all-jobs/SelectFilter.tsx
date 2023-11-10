import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  styled,
} from "@mui/material";
import { filterStyles } from "./styles/filterStyles";

interface Props {
  label: string;
  options: string[];
  onSelect: (selection: string) => void;
}

const StyledFormControl = styled(FormControl)`
  ${filterStyles}
`;

const SelectFilter = ({ label, options, onSelect }: Props) => {
  return (
    <StyledFormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select
        label={label}
        value=""
        onChange={(event) => onSelect(event.target.value as string)}
      >
        <MenuItem value={"all"}>- Choose One -</MenuItem>
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </StyledFormControl>
  );
};

export default SelectFilter;
