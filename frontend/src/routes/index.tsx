import { Button } from '@mui/material';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from '../pages/LandingPage';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/sign" element={<p>Login Page</p>} />
      <Route path="/my" element={<p>Layout</p>} />
      <Route path="/auth" element={<Button>Authentication</Button>} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
