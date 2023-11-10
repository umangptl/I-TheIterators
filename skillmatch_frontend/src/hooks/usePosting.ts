import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";
import { Job } from "./useJobs";

const defaultJob: Job = {
    jobId: "",
    title: "",
    datePosted: new Date(),
    deadline: new Date(),
    description: "",
    skillsRequired: [],
    location: "",
    requiredQualifications: "",
    hiringTeamInfo: "",
    requiredDocuments: [],
    tag: "",
    experience: "",
    salary: 0,
    //applicantNo: number,
    type: "",
    //department: string,
  }
  
const usePosting = (jobId: string) => {
    const [job, setJob] = useState<Job>();
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

    return { job, setJob, error };
}

export default usePosting;