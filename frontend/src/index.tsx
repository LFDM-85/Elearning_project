import { ThemeProvider } from '@mui/system';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import { Theme } from './shared/themes';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ThemeProvider theme={Theme}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ThemeProvider>
);
