import { Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from '../pages/LandingPage/LandingPage';
import { MyPage } from '../pages/MyPage/MyPage';
import { SignPage } from '../pages/SignPage/SignPage';

const log = localStorage.getItem('isLogged');
export const AppRoutes = () => {
  let logged;
  if (log === '1') logged = true;
  if (log !== '1') logged = false;

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/sign" element={<SignPage />} />
      {logged ? <Route path="/my" element={<MyPage />} /> : <Route path="/" />}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
