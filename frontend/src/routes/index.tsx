import { Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from '../pages/LandingPage/LandingPage';
import { MyPage } from '../pages/MyPage/MyPage';
import { SignPage } from '../pages/SignPage/SignPage';
import { useState } from 'react';

export const AppRoutes = () => {
  const [Authenticated, setAuthenticated] = useState(false);

  const authenticated = () => {
    setAuthenticated(true);
  };

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/sign"
        element={<SignPage authenticated={authenticated} />}
      />
      {Authenticated && <Route path="/my" element={<MyPage />} />}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
