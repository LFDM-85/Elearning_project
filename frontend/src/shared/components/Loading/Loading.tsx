import { Typography } from '@mui/material';
// import { CSSProperties } from 'react';
import { RingLoader } from 'react-spinners';

// Custom css for loader
// const override: CSSProperties = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   marginRight: '-50%',
//   transform: 'translate(-50%, -50%)',
// };
export const Loading = () => {
  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        color: '#0077b6',
      }}
    >
      <RingLoader
        color="#0077b6"
        // cssOverride={override}
        size={150}
        speedMultiplier={1}
      />
      <Typography ml={6} variant="h1" component="h1">
        Loading . . .
      </Typography>
    </div>
  );
};
