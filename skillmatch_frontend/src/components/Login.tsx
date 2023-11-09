import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GoogleLogin from "../components/GoogleLogin";
import { postLoginToken } from "../api/postLoginToken";
import { useLoginContext } from "../hooks/useLoginContext";

export const Login = () => {
  const navigate = useNavigate();
  const { isLogin, setIsLogin } = useLoginContext();

  async function onGoogleSignIn(res: any) {
    const { credential } = res;
    const result = await postLoginToken(credential);
    setIsLogin(result);
  }

  useEffect(() => {
    if (!isLogin) return;
    navigate("/");
  }, [isLogin, navigate]);

  return (
    <div>
      <h1>Google Login</h1>
      <GoogleLogin onGoogleSignIn={onGoogleSignIn} text="Login" />
    </div>
  );
};
export default Login;
