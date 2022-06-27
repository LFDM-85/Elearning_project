import { Button } from '@mui/material';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from '../pages/LandingPage/LandingPage';
import { MyPage } from '../pages/MyPage/MyPage';
import { SignPage } from '../pages/SignPage/SignPage';
import { SignUpPage } from '../pages/SignUpPage/SignUpPage';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/sign" element={<SignPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/my" element={<MyPage />} />
      <Route path="/auth" element={<Button>Authentication</Button>} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
