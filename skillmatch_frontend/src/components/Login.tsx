import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GoogleLogin from '../components/GoogleLogin';
import { postLoginToken } from '../api/postLoginToken';
import React from "react";

interface LoginProps {
    isLogin: boolean;
    setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}
  
export default function Login({ isLogin, setIsLogin }: LoginProps) {
    const navigate = useNavigate();
    
    async function onGoogleSignIn(res: any) {
      const { credential } = res;
      const result = await postLoginToken(credential);
      setIsLogin(result);
    }
  
    useEffect(() => {
        if (!isLogin) return;
        navigate("/")
    }, [isLogin, navigate]);
  
    return (
      <div>
        <h1>Google Login</h1>
        <GoogleLogin onGoogleSignIn={onGoogleSignIn} text="Login" />
      </div>
    );
}