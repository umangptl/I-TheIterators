export const postLoginToken = async (idToken: string) => {
  const API_URL = "http://localhost:8081";
  const path = '/v1/oauth/login';

  try {
    const response = await fetch(`${API_URL}${path}`, {
      method: 'POST',
      credentials: 'include', // include, *same-origin, omit
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(idToken), 
    });
    if (!response.ok) throw new Error('bad server condition');
    return true;
  } catch (e: any) {
    console.error('postLoginToken Error: ', e.message);
    return false;
  }
};
