import { Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from '../pages/LandingPage/LandingPage';
import { MyPage } from '../pages/MyPage/MyPage';
import { SignPage } from '../pages/SignPage/SignPage';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const token = cookies.get('token');

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/sign" element={<SignPage />} />
      {token ? <Route path="/my" element={<MyPage />} /> : <Route path="/" />}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
