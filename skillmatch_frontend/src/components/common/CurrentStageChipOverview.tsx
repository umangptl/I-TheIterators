import React from "react";
import { Chip } from "@mui/material";

type chipProps = {
  activeLabel: string;
  activeClass?: string;
};

const CurrentStageChipOverview = (props: chipProps) => {
  return (
    <Chip
      label={props.activeLabel}
      className={
        props.activeClass
          ? props.activeClass + " currentStageOverview"
          : "currentStageOverview"
      }
    />
  );
};

export default CurrentStageChipOverview;
