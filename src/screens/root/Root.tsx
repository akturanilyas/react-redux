import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { defaultConstant } from '../../constants/defaultConstant';
import Navigation from './Navigation';

const mdTheme = createTheme();

export default function Root() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const changePage = (url: string) => {
    navigate(url);
  };

  const pages = [
    {
      url: '/url',
      title: 'title',
      component: <h1>titlteea</h1>,
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
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${defaultConstant.DRAWER_WIDTH}px)` },
            ml: { sm: `${defaultConstant.DRAWER_WIDTH}px` },
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={() => changePage('/ilyas')}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Responsive drawer
            </Typography>
          </Toolbar>
        </AppBar>
        <Navigation handleDrawerToggle={handleDrawerToggle} mobileOpen={mobileOpen} pages={pages} />
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${defaultConstant.DRAWER_WIDTH}px)` } }}
        >
          <Toolbar />
          <Routes>
            {pages.map((item) => {
              return <Route path={item.url} element={item.component} />;
            })}

            <Route path={'*'} element={<h1>Not found</h1>} />
          </Routes>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
