import React, {ReactElement} from 'react';
import {Typography} from '@mui/material';

export const MyLayout: React.FC<any> = (props): ReactElement => {
  return <Typography ml={6} variant="h4" component="h4">
    Welcome back {props.currUser}
  </Typography>;
};
