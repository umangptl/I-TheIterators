import React from "react";
import { useJobsContext } from "../../hooks/JobsContext";
import { LinearProgress } from "@mui/material";

type jobId = {
  jobId: string;
};

const SpecificJobTimeLeftChart = (props: jobId) => {
  const { jobs } = useJobsContext();
  if (jobs.length > 0) {
    let filteredJob = jobs.filter((job) => job.jobId === props.jobId);
    if (filteredJob.length > 0) {
      const datePosted = new Date(filteredJob?.[0].datePosted);
      const dateDeadline = new Date(filteredJob?.[0].deadline);
      const currentTime = new Date();
      let timeLeftTilDeadline = null;
      let colorProgressBar: any = "info";
      if (!isNaN(datePosted.getTime()) && !isNaN(dateDeadline.getTime())) {
        const totalDuration = dateDeadline.getTime() - datePosted.getTime();
        const timeElapsed = currentTime.getTime() - datePosted.getTime();
        const timeRemaining = totalDuration - timeElapsed;
        const percentTimeLeft = (timeRemaining / totalDuration) * 100;
        timeLeftTilDeadline = Math.floor(
          Math.min(Math.max(percentTimeLeft, 0), 100)
        );
        if (100 - timeLeftTilDeadline > 90) {
          colorProgressBar = "error";
        } else if (100 - timeLeftTilDeadline > 80) {
          colorProgressBar = "warning";
        }
      }
      if (timeLeftTilDeadline != null) {
        const localeDate = dateDeadline.toLocaleString("default", {
          month: "long",
          year: "numeric",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
        });

        return (
          <>
            <p style={{ fontWeight: 500 }}>
              Time Left until Deadline:{" "}
              <span style={{ fontWeight: 300 }}>{localeDate}</span>
            </p>
            {100 - timeLeftTilDeadline >= 100 ? (
              <LinearProgress
                variant="determinate"
                color={colorProgressBar}
                value={100}
              />
            ) : (
              <LinearProgress
                variant="determinate"
                color={colorProgressBar}
                value={100 - timeLeftTilDeadline}
              />
            )}
          </>
        );
      } else {
        return null;
      }
    } else {
      return null;
    }
  } else {
    return null;
  }
};

export default React.memo(SpecificJobTimeLeftChart);
