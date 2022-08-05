import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import SignImage from '../../assets/user-login.svg';
import axios from '../../interceptors/axios';
import { useNavigate } from 'react-router-dom';
import { setToken } from '../../shared/features/TokenManagement';
import useAuth from '../../shared/hooks/useAuth';
import { useForm } from 'react-hook-form';
import { getToken } from '../../shared/features/TokenManagement';
import { signup } from '../../shared/features/SignServices';

export function SignPage(): JSX.Element {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { name: '', email: '', password: '' } });
  const [signIn, setSignIn] = useState(true);

  const authCtx = useAuth();

  useEffect(() => {
    const savedToken = getToken();
    signToken(savedToken);
    authCtx.isSignedIn = true;
  }, []);

  const signUpToggleHandler = () => {
    setSignIn((prevState) => {
      return !prevState;
    });
  };
  const signRoute: string = signIn ? 'auth/signin' : 'auth/signup';

  const signToken = async (token: string | null) => {
    return axios({
      url: 'auth/signToken',
      method: 'Post',
      data: token,
      timeout: 5000,
      headers: { Accept: 'application/json' },
    })
      .then((res) => {
        setToken(res.data.token);

        return Promise.resolve(res);
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  };

  const submitHandler = async ({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) => {
    const inputs = {
      name,
      email,
      password,
    };

    const PROFESSOR_ROLE = ['professor']; // default role on signUp

    if (!signIn) {
      axios
        .post(signRoute, { ...inputs, role: PROFESSOR_ROLE })
        .then((res) => {
          if (res.status === 201) {
            alert('User was created! Please Sign In');
            console.log('User created');
            navigate('/sign', { replace: true });
            return;
          }
        })
        .catch(function (error) {
          alert('Email already exists!');
          navigate('/sign', { replace: true });
          console.log(error.message);
          return;
        });
    }

    if (signIn) {
      axios
        .post(signRoute, inputs, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        })
        .then((res) => {
          const accessToken = res.data.token;
          const user = res.data.user;
          console.log(res.data);

          authCtx.signin(accessToken, user);
          authCtx.isSignedIn = true;
          setToken(accessToken);

          console.log('User logged In');
          navigate('/my', { replace: true });
        })
        .catch(function (error) {
          alert('User not found!');
          console.log(error.message);
          authCtx.isSignedIn = false;
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
            onSubmit={handleSubmit(submitHandler)}
            sx={{ mt: 1 }}
          >
            {!signIn && (
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Your Name"
                {...register('name', { required: 'Name is required!' })}
                autoComplete="name"
                autoFocus
                error={!!errors?.name}
                helperText={errors?.name ? errors.name.message : null}
              />
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              {...register('email', {
                required: 'Email is required!',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
              autoComplete="email"
              autoFocus
              error={!!errors?.email}
              helperText={errors?.email ? errors.email.message : null}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              {...register('password', {
                required: 'Password is required!',
                minLength: {
                  value: 8,
                  message: 'Invalid password, must have at least 8 characters',
                },
              })}
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={!!errors?.password}
              helperText={errors?.password ? errors.password.message : null}
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
