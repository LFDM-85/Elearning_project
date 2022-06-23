import { createTheme } from '@mui/material';

export const LightTheme = createTheme({
  palette: {
    primary: {
      main: '#52B69A',
      dark: '#34A0A4',
      light: '#99D98C',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#99d98c',
      dark: '#34A0A4',
      light: '#d9ed92',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f7f6f3',
      paper: '#ffffff',
    },
  },
});
