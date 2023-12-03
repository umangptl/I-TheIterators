import React, { createContext, ReactNode, useContext } from "react";
import useApplicants, { Applicant } from "./useApplicants";

type ApplicantsContextType = {
  applicants: Applicant[];
  setApplicants: React.Dispatch<React.SetStateAction<Applicant[]>>;
  applicantError: string;
};

const ApplicantsContext = createContext<ApplicantsContextType | undefined>(
  undefined
);

type ApplicantsProviderProps = {
  children: ReactNode;
};

export const ApplicantsProvider: React.FC<ApplicantsProviderProps> = ({
  children,
}) => {
  const { applicants, setApplicants, applicantError } = useApplicants();

  return (
    <ApplicantsContext.Provider
      value={{ applicants, setApplicants, applicantError }}
    >
      {children}
    </ApplicantsContext.Provider>
  );
};

export const useApplicantsContext = () => {
  const context = useContext(ApplicantsContext);
  if (context === undefined) {
    throw new Error(
      "useApplicantsContext must be used within a ApplicantsProvider"
    );
  }
  return context;
};

export default ApplicantsContext;
