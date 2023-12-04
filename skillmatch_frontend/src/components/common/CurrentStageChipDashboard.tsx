import React from "react";
import { Chip } from "@mui/material";
import "../styles/ApplicantInfo.css";

type chipProps = {
  activeLabel: string;
};

const CurrentStageChipDashboard = (props: chipProps) => {
  let activeClass = "";

  switch (props.activeLabel) {
    case "REJECTED":
      activeClass = "stageSelectedRejected";
      break;
    case "PENDING":
      activeClass = "stageSelectedPending";
      break;
    case "INTERVIEWING":
      activeClass = "stageSelectedInterviewing";
      break;
    case "SELECTED":
      activeClass = "stageSelectedSent";
      break;
    case "SHORTLISTED":
      activeClass = "stageSelectedShortlisted";
      break;
    case "WITHDRAWN":
      activeClass = "stageSelectedWithdrawn";
      break;
    default:
  }

  return (
    <Chip
      label={props.activeLabel}
      className={"dashboardChip " + activeClass}
    />
  );
};

export default CurrentStageChipDashboard;
