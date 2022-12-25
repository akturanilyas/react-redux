import { Box, Button, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import NotFoundImage from '../../assets/images/404.png';
import { URL_CONSTANT } from '../../constants/URL_CONSTANT';
import Chat from '../chat/Chat';
import NotFound from '../not-found/NotFound';

const mdTheme = createTheme();

export default function Root() {
  const pages = [
    {
      url: URL_CONSTANT.CHATS,
      title: 'title',
      component: <Chat />,
      icon: 'icon',
    },
    {
      url: '*',
      title: 'title',
      component: <NotFound />,
      icon: 'icon',
    },
  ];

  return (
    <ThemeProvider theme={mdTheme}>
      <Box
        sx={{
          maxHeight: '100vh',
        }}
      >
        <Container maxWidth="xl">
          <Routes>
            {pages.map((item) => {
              return <Route key={item.url} path={item.url} element={item.component} />;
            })}
          </Routes>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
