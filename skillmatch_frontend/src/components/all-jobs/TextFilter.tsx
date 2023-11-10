import { FormControl, TextField, styled } from "@mui/material";
import { filterStyles } from "./styles/filterStyles";

interface Props {
  label: string;
  onChange: (selection: string) => void;
}

const StyledFormControl = styled(FormControl)`
  ${filterStyles}
`;

const TextFilter = ({ label, onChange }: Props) => {
  return (
    <StyledFormControl fullWidth>
      <TextField
        label={label}
        onChange={(event) => onChange(event.target.value)}
      ></TextField>
    </StyledFormControl>
  );
};

export default TextFilter;
