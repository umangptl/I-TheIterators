import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

export interface Job {
    jobId: string;
    title: string;
    datePosted: string;
    deadline: string;
    description: string;
    skillsRequired: string[];
    location: string;
    requiredQualifications: string;
    hiringTeamInfo: string;
    requiredDocuments: string;
    tag: string;
    experience: string;
    //applicantNo: number;
    type: string;
    //department: string;
  }
  
const useJobs = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [error, setError] = useState("");

    useEffect(() => {
      const controller = new AbortController();

      apiClient
        .get("/job", {signal: controller.signal})
        .then((res) => setJobs(res.data))
        .catch((err) => {
            if (err instanceof CanceledError) return;
            setError(err.message)
        });

        return () => controller.abort();
    }, []);

    return { jobs, setJobs, error };
}

export default useJobs;