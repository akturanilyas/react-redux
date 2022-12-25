import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import Chat from '../chat/Chat';

const mdTheme = createTheme();

export default function Root() {
  const pages = [
    {
      url: '/chat',
      title: 'title',
      component: <Chat />,
      icon: 'icon',
    },
    {
      url: '/setting',
      title: 'title',
      component: <h1>settings</h1>,
      icon: 'icon',
    },
  ];

  return (
    <ThemeProvider theme={mdTheme}>
      <Routes>
        {pages.map((item) => {
          return <Route key={item.url} path={item.url} element={item.component} />;
        })}
      </Routes>
    </ThemeProvider>
  );
}
