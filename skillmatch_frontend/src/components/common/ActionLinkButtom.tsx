import { Button, ButtonProps } from "@mui/material";
import { styled } from "@mui/system";
import { Link, LinkProps } from "react-router-dom";

const ActionLinkButton = styled(Button)<ButtonProps & LinkProps>(
  ({ theme }) => ({
    borderRadius: 0,
    marginLeft: "8px",
    marginBottom: "8px",
  })
);
ActionLinkButton.defaultProps = {
  variant: "contained",
  color: "secondary",
  size: "small",
  component: Link,
};

export default ActionLinkButton;
