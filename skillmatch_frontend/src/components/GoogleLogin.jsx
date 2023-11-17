import { useRef } from 'react';
import useScript from '../hooks/useScript';

export default function GoogleLogin({
  onGoogleSignIn = (any) => {},
  text = 'signin_with',
}) {
  const googleSignInButton = useRef(null);

  useScript('https://accounts.google.com/gsi/client', () => {
    window.google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      callback: onGoogleSignIn,
    });
    window.google.accounts.id.renderButton(googleSignInButton.current, {
        theme: "filled_black",
        size: "medium",
        text,
        width: "275px",
    });
  });

  return <div ref={googleSignInButton}></div>;
}
