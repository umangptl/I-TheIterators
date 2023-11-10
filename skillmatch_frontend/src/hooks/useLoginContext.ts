import { createContext, useContext } from 'react';

interface Login {
    isLogin: boolean;
    setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LoginContext = createContext<Login | undefined>(undefined);

export function useLoginContext() {
  const login = useContext(LoginContext);

  if (login === undefined) {
    throw new Error('useLoginContext must be used with a LoginContext.Provider');
  }
  const isLogin = login.isLogin;
  const setIsLogin = login.setIsLogin;

  return {isLogin, setIsLogin};
}