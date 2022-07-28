import { createTheme } from '@mui/material';

export const Theme = createTheme({
  palette: {
    primary: {
      main: '#495057',
      dark: '#212529',
      light: '#6c757d',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#0077b6',
      dark: '#03045e',
      light: '#00b4d8',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f7f6f3',
      paper: '#ffffff',
    },
  },
});
