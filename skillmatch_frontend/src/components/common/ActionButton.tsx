import { Button, ButtonProps } from "@mui/material";
import { styled } from "@mui/material/styles";

const ActionButton = styled(Button)<ButtonProps>(({ theme }) => ({
  borderRadius: 0,
  marginLeft: "8px",
  marginBottom: "8px",
}));
ActionButton.defaultProps = {
  variant: "contained",
  color: "secondary",
  size: "small",
};

export default ActionButton;
