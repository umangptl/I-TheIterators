import React from "react";
import { Chip } from "@mui/material";

type chipProps = {
  activeLabel: string;
  activeClass: string;
  isActive: boolean;
};

const CurrentStageChip = (props: chipProps) => {
  return (
    <Chip
      label={props.activeLabel}
      className={props.isActive ? props.activeClass : ""}
    />
  );
};

export default CurrentStageChip;
