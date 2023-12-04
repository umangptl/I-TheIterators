import React, { createContext, ReactNode, useContext } from "react";
import useApplicationsByJob, { Application } from "./useApplicationsByJob";

type ApplicationsContextType = {
  applications: Application[];
  setApplications: React.Dispatch<React.SetStateAction<Application[]>>;
  error: string;
};

const ApplicationsContext = createContext<ApplicationsContextType | undefined>(
  undefined
);

type ApplicationsProviderProps = {
  children: ReactNode;
  jobId: string;
};

export const ApplicationsProvider: React.FC<ApplicationsProviderProps> = ({
  children,
  jobId,
}) => {
  const { applications, setApplications, error } = useApplicationsByJob(jobId);
  console.log("Context apps run");
  return (
    <ApplicationsContext.Provider
      value={{ applications, setApplications, error }}
    >
      {children}
    </ApplicationsContext.Provider>
  );
};

export const useApplicationsContext = () => {
  const context = useContext(ApplicationsContext);
  if (context === undefined) {
    throw new Error(
      "useApplicationsContext must be used within a ApplicationsProvider"
    );
  }
  return context;
};

export default ApplicationsContext;
