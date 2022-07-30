import { useNavigate} from 'react-router-dom';
import unauthorized from '../../assets/goback.svg';
import {Button, Grid} from '@mui/material';
import React from 'react';


const Unauthorized = () => {
  const navigate = useNavigate();

  const goPreviousPage = () => navigate(-1);

  return (
    <Grid container component="main"  sx={{ height: '100vh' }}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        alignContent='center'
        style={{
          backgroundImage: `url(${unauthorized})`,
          backgroundRepeat: 'no-repeat',
          // backgroundSize: 'cover',
          // resize: 'both',
          backgroundPosition: 'center',
          height: '80%',
        }}
      >
        
      </Grid>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
      >

        <Grid margin={6}>
          <Button
            onClick={goPreviousPage}
            size="large"
            variant="contained"
            color="secondary"
          >
                    Go Back
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Unauthorized;