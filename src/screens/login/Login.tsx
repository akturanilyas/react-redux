import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../../api/authService';
import { StyledLink } from '../../components/styled-link/styledLink';
import { UrlConstant } from '../../constants/urlConstant';
import { login, selectIsAuthorized } from '../../features/auth/authSlice';
import { useLoginQueryMutation } from '../../services/auth';

export default function Login() {
  const [loginQuery, response] = useLoginQueryMutation();
  const service = new AuthService();
  const dispatch = useDispatch();
  const isAuthorized = useSelector(selectIsAuthorized);
  const navigate = useNavigate();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const username = data.get('username') as string;
    const password = data.get('password') as string;
    try {
      await loginQuery({ username, password }).unwrap();
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (response.isSuccess) {
      service.setToken(response.data.token).then(() => {
        dispatch(login(response.data.token));
      });
    }
  }, [response]);

  useEffect(() => {
    const getToken = async () => {
      const data = await service.getToken();

      if (null !== data) {
        dispatch(login({ data }));
      }

      if (true === isAuthorized) {
        navigate('/');
      }

      return data;
    };

    getToken();
  }, [isAuthorized]);

  return (
    <Container component="main" maxWidth="xs" className={'login-page'}>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" noValidate onSubmit={(event) => handleSubmit(event)} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField required fullWidth id="username" label="Username" name="username" autoComplete="username" />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Login
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <StyledLink to={UrlConstant.SIGN_UP}>You dont have an account? Sign up</StyledLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
