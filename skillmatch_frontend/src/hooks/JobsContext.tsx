import React, { createContext, ReactNode, useContext } from "react";
import useJobs from "./useJobs";
import { Job } from "../models/Job";

type JobsContextType = {
  jobs: Job[];
  setJobs: React.Dispatch<React.SetStateAction<Job[]>>;
  error: string;
};

const JobsContext = createContext<JobsContextType | undefined>(undefined);

type JobsProviderProps = {
  children: ReactNode;
};

export const JobsProvider: React.FC<JobsProviderProps> = ({ children }) => {
  const { jobs, setJobs, error } = useJobs();

  return (
    <JobsContext.Provider value={{ jobs, setJobs, error }}>
      {children}
    </JobsContext.Provider>
  );
};

export const useJobsContext = () => {
  const context = useContext(JobsContext);
  if (context === undefined) {
    throw new Error("useJobsContext must be used within a JobsProvider");
  }
  return context;
};

export default JobsContext;
