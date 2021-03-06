import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import SignImage from '../../assets/user-login.svg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext} from '../../routes';



export function SignPage(): JSX.Element {
  const navigate = useNavigate();
  const [signIn, setSignIn] = useState(true);
  const { dispatch }: any = React.useContext(AuthContext);

  const signUpToggleHandler = () => {
    setSignIn((prevState) => {
      return !prevState;
    });
  };

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const PROFESSOR_ROLE = ['professor']; // default role on signUp

    const inputs = {name: data.get('name'), email: data.get('email'), password: data.get('password')};

    const URL = 'http://localhost:5000/auth/';

    const signRoute: string = signIn ? URL + 'signin' : URL + 'signup';

    if (signIn) {
      axios
        .post(signRoute, inputs)
        .then((res) => {
          console.log(res);
          dispatch({
            type: 'SignIn', payload: res.data
          });
          console.log('User logged In');
          navigate('/my', { replace: true });

          return;

        })
        .catch(function (error) {
          alert('User not found!');
          console.log(error.message);
        });
    }

    if (!signIn) {
      axios
        .post(signRoute, {...inputs, role : PROFESSOR_ROLE })
        .then((res) => {
          console.log(res);
          navigate('/', { replace: true });

          alert('User was created! Please Sign In');
          console.log('User created');

          return;
        })
        .catch(function (error) {
          alert('User already exists!');
          console.log(error.message);
        });

    }

  };

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url(${SignImage})`,
          backgroundRepeat: 'no-repeat',

          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            {!signIn ? 'Sign Up - Professors Only' : 'Sign In'}
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={submitHandler}
            sx={{ mt: 1 }}
          >
            {!signIn && (
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Your Name"
                name="name"
                autoComplete="name"
                autoFocus
              />
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              sx={{ mt: 3, mb: 2 }}
            >
              {!signIn ? 'Sign Up' : 'Sign In'}
            </Button>
            <Grid container>
              <Grid item>
                <Link href="#" variant="body2" onClick={signUpToggleHandler}>
                  {signIn
                    ? 'Dont have an account? Sign Up'
                    : 'Have an account? Sign In'}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
