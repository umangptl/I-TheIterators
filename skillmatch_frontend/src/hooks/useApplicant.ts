import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";
import { Applicant } from "../models/Applicant";
import { Resume } from "../models/Resume";

export interface Application {
    applicationId: string;
    status: string;
    jobId: string;
    applicantId: string;
    applicant: Applicant;
    resume: any;
}

const useApplicant = (applicantionId: any) => {
    // should be given an applicantId, just used any so it wouldn't throw error
    const [application, setApplication] = useState<Application>();
    const [applicationError, setApplicationError] = useState("");

    useEffect(() => {
        const controller = new AbortController();
        apiClient
            .get("/application/" + applicantionId, {
                signal: controller.signal,
            })
            .then((res) => setApplication(res.data))
            .catch((err) => {
                if (err instanceof CanceledError) return;
                setApplicationError(err.message);
                console.log(err);
            });

        return () => controller.abort();
    }, []);

    return { application, setApplication, applicationError };
};
export default useApplicant;
