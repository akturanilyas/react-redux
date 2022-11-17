import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Root from './screens/root/Root';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Root />
      </BrowserRouter>
    </div>
  );
}

export default App;
