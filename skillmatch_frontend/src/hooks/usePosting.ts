import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";
import { Job } from "./useJobs";
  
const usePosting = (jobId: string) => {
    const [job, setJob] = useState<Job | null>(null);
    const [error, setError] = useState("");

    useEffect(() => {
      const controller = new AbortController();

      apiClient
        .get("/job/" + jobId, {signal: controller.signal})
        .then((res) => setJob(res.data))
        .catch((err) => {
            if (err instanceof CanceledError) return;
            setError(err.message)
        });

        return () => controller.abort();
    }, []);

    return { job, error };
}

export default usePosting;