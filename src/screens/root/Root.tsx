import { AppBar, Toolbar } from '@mui/material';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import Chat from '../chat/Chat';
import Navigation from './Navigation';

const mdTheme = createTheme();

export default function Root() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

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
      <AppBar position="static">
        <Toolbar></Toolbar>
      </AppBar>

      <div className={'h-100 row m-0'}>
        <div className="col-3">
          <Navigation handleDrawerToggle={handleDrawerToggle} mobileOpen={mobileOpen} pages={pages} />
        </div>
        <div className="col-9 m-0">
          <Box className={'h-100'}>
            <Routes>
              {pages.map((item) => {
                return <Route path={item.url} element={item.component} />;
              })}

              <Route path={'*'} element={<h1>Not found</h1>} />
            </Routes>
          </Box>
        </div>
        <CssBaseline />
      </div>
    </ThemeProvider>
  );
}
