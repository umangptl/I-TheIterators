import React from "react";
import { useJobsContext } from "../../hooks/JobsContext";

type jobId = {
  jobId: string;
};

const GetJobName = (props: jobId) => {
  const { jobs } = useJobsContext();
  const filteredJob = jobs.filter((job) => job.jobId === props.jobId);
  return (
    <span>
      {" "}
      for: {filteredJob?.[0].title} @ {filteredJob?.[0].location}
    </span>
  );
};

export default GetJobName;
