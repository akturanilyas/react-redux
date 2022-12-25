import { Box, Button, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import NotFoundImage from '../../assets/images/404.png';
import { URL_CONSTANT } from '../../constants/URL_CONSTANT';

export default function NotFound() {
  const navigate = useNavigate();
  const routeChange = () => {
    const path = URL_CONSTANT.CHATS;
    navigate(path);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid xs={6}>
            <Typography variant="h1">404</Typography>
            <Typography variant="h6">The page you’re looking for doesn’t exist.</Typography>
            <Button variant="contained" onClick={routeChange}>
              Back to Chat
            </Button>
          </Grid>
          <Grid xs={6}>
            <img src={NotFoundImage} alt="" width={500} height={250} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
