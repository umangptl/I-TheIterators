import { Applicant } from "./Applicant";

export interface Application {
  status: string;
  applicant: Applicant;
  jobId: string;
}
