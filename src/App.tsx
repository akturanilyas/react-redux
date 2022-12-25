import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useLazySelfQuery } from './api/services/auth/authService';
import './App.css';
import { TOKEN } from './constants/localStorageConstants';
import { UrlConstant } from './constants/urlConstant';
import { isEmpty } from './helpers/commonHelpers';
import { useMain } from './redux/slices/mainSlice';
import Login from './screens/login/Login';
import Root from './screens/root/Root';
import SignUp from './screens/sign-up/SignUp';
import { User } from './types/models';

function App() {
  const { user } = useMain();
  const accessToken = localStorage.getItem(TOKEN);
  const [getSelf] = useLazySelfQuery();
  const handleLayout = () => {
    if (true || (!isEmpty<User>(user) && !isEmpty(accessToken))) {
      return (
        <div style={{ position: 'absolute', top: 0, left: 0, height: '100vh', width: '100%' }}>
          <Routes>
            <Route path={'*'} element={<Root />} />
          </Routes>
        </div>
      );
    }

    return (
      <Routes>
        <Route path={UrlConstant.LOGIN} element={<Login />} />
        <Route path={UrlConstant.SIGN_UP} element={<SignUp />} />
      </Routes>
    );
  };

  useEffect(() => {
    getSelf();
  }, []);

  return (
    <BrowserRouter>
      <ToastContainer />
      {handleLayout()}
    </BrowserRouter>
  );
}

export default App;
