import { Button, ButtonProps } from "@mui/material";
import { styled } from "@mui/system";
import { Link, LinkProps } from "react-router-dom";

const LinkButton = styled(Button)<ButtonProps & LinkProps>(({ theme }) => ({}));
LinkButton.defaultProps = {
  variant: "contained",
  color: "success",
  component: Link,
  size: "small",
};

export default LinkButton;
