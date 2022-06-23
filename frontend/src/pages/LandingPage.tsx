import { Button, CssBaseline, Grid, Typography } from '@mui/material';

import HeroImage from '../assets/Work from home.png';

export const LandingPage = () => {
  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />

      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        xs={12}
        sx={{
          backgroundImage: `${require('../assets/Work from home.png')}`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Typography variant="h2" component="h2">
          Elearn School
        </Typography>
        <Typography variant="h4" component="h4">
          Best elearning tool for teachers and students
        </Typography>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Button variant="contained">SignUp</Button>
          <Button variant="contained">SignIn</Button>
        </Grid>
      </Grid>
    </Grid>
  );
};
