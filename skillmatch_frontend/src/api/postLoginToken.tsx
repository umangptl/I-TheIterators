import apiClient from "../services/api-client";

export const postLoginToken = async (idToken: string) => {
  const path = "/v1/oauth/login";

  try {
    const response: any = await apiClient.post(path, JSON.stringify(idToken), {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    if (response.status !== 200) throw new Error("bad server condition");
    return true;
  } catch (e: any) {
    console.error("postLoginToken Error: ", e.message);
    return false;
  }
};
