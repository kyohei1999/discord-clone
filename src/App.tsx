import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.scss';
import Sidibar from './componet/sidebar/Sidebar';
import Chat from './componet/chat/Chat';
import { useSelector } from 'react-redux';
import Login from './componet/login/Login';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { auth } from './firebase';
import { login, logout } from './features/userSlice';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallBack } from './utils/ErrorfallBack';

function App() {
  const user = useAppSelector((state) => state.user.user);
  console.log(user);

  const dispatch = useAppDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((loginUser) => {
      console.log(loginUser);
      if (loginUser) {
        dispatch(
          login({
            uid: loginUser.uid,
            photo: loginUser.photoURL,
            email: loginUser.email,
            displayName: loginUser.displayName,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);

  return (
    <div className="App">
      {user ? (
        <>
          <ErrorBoundary FallbackComponent={ErrorFallBack}>
            <Sidibar />
          </ErrorBoundary>
          <Chat />
        </>
      ) : (
        <Login></Login>
      )}
    </div>
  );
}

export default App;
