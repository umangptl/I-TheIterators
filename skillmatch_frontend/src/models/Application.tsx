import { Applicant } from "./Applicant";

export interface Application {
    status: string;
    applicant: Applicant | undefined;
    jobId: string;
}