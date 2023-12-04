import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { AxiosError } from "axios";

type ApplicationStatus =
  | "PENDING"
  | "REJECTED"
  | "INTERVIEWING"
  | "SELECTED"
  | "SHORTLISTED"
  | "WITHDRAWN";

const usePutApplicationsByJob = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const updateApplicationStatus = async (
    applicationId: string,
    status: ApplicationStatus
  ) => {
    setIsLoading(true);
    try {
      await apiClient.put(`/application/${applicationId}/status/${status}`);
    } catch (error) {
      const axiosError = error as AxiosError;
      setError(axiosError?.response?.data);
    } finally {
      setIsLoading(false);
    }
  };
  return { updateApplicationStatus, isLoading, error };
};

export default usePutApplicationsByJob;
