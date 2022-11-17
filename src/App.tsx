import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Root from './screens/root/Root';

function App() {
  return (
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  );
}

export default App;
