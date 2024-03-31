import React from 'react';
import './Login.scss';
import { Button } from '@mui/material';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithRedirect,
} from 'firebase/auth';
import { auth, provider } from '../../firebase';

function login() {
  const signIn = () => {
    signInWithRedirect(auth, provider).catch((err) => {
      alert(err.ChatMessage);
    });
  };

  return (
    <div className="login">
      <div className="loginLogo">
        <img src="discordIcon.png" alt="" />
      </div>

      <Button onClick={signIn}>ログイン</Button>
    </div>
  );
}

export default login;
