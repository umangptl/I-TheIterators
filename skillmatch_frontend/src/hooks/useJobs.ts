import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";
import { Job } from "../models/Job";
  
const useJobs = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [error, setError] = useState("");

    useEffect(() => {
      const controller = new AbortController();

      apiClient
        .get("/job", { signal: controller.signal})
        .then((res) => setJobs(res.data))
        .catch((err) => {
            if (err instanceof CanceledError) return;
            setError(err.message)
            console.log(err);
        });

        return () => controller.abort();
    }, []);

    return { jobs, setJobs, error };
}

export default useJobs;