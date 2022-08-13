import { ThemeProvider } from '@mui/system';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { App } from './App';
import { Theme } from './shared/themes';
import './interceptors/axios';
import { AuthContextProvider } from './shared/store/auth-context';
import { CookiesProvider } from 'react-cookie';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <CookiesProvider>
    <ThemeProvider theme={Theme}>
      <BrowserRouter>
        <AuthContextProvider>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </AuthContextProvider>
      </BrowserRouter>
    </ThemeProvider>
  </CookiesProvider>
);
