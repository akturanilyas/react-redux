import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.css';
import { UrlConstant } from './constants/urlConstant';
import Login from './screens/login/Login';
import Root from './screens/root/Root';
import SignUp from './screens/sign-up/SignUp';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path={UrlConstant.LOGIN} element={<Login />} />
        <Route path={UrlConstant.SIGN_UP} element={<SignUp />} />
        <Route path={'*'} element={<Root />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
