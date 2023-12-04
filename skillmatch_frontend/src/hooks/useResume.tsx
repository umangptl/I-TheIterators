import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

const useResume = (applicationId: any) => {
  const [resume, setResume] = useState<any>();
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    apiClient
      .get("/application/" + applicationId + "/resume", {
        signal: controller.signal,
      })
      .then((res) => setResume(res.data))
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        console.log(err);
      });

    return () => controller.abort();
  }, []);

  return { resume, setResume, error };
};

export default useResume;
