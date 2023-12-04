import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";
import { Job } from "../models/Job";

const useJob = (jobId: any) => {
  const [job, setJob] = useState<Job>();
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    apiClient
      .get("/job/" + jobId, { signal: controller.signal })
      .then((res) => setJob(res.data))
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        console.log(err);
      });

    return () => controller.abort();
  }, []);

  return { job, setJob, error };
};

export default useJob;
