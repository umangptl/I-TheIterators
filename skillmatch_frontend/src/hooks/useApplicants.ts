import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

export interface Applicant {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address: string;
    resume: any; // change to binary
    coverLetter: any; // change to binary
    provider: any; // change to provider
}

const useApplicants = () => {
    const [applicants, setApplicants] = useState<Applicant[]>([]);
    const [applicantError, setApplicantError] = useState("");

    useEffect(() => {
        const controller = new AbortController();
        apiClient
            .get("/applicant", { signal: controller.signal })
            .then((res) => setApplicants(res.data))
            .catch((err) => {
                if (err instanceof CanceledError) return;
                setApplicantError(err.message);
                console.log(err);
            });

        return () => controller.abort();
    }, []);

    return { applicants, setApplicants, applicantError };
};
export default useApplicants;
