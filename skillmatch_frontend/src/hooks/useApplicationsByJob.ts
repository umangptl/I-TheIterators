import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

export interface Application {
  applicationId: string,
  status: string,
  jobId: string,
  applicantId: string
}

//jobId: "234253",
  
const useApplicationsByJob = (jobId: string) => {
    const [applications, setApplications] = useState<Application[]>();
    const [error, setError] = useState("");

    useEffect(() => {
      const controller = new AbortController();

      apiClient
        .get("/application/job/" + jobId, {signal: controller.signal})
        .then((res) => setApplications(res.data))
        .catch((err) => {
            if (err instanceof CanceledError) return;
            setError(err.message)
        });

        return () => controller.abort();
    }, []);

    return { applications, setApplications, error };
}

export default useApplicationsByJob;