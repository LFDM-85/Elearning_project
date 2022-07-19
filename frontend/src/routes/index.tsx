import { Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from '../pages/LandingPage/LandingPage';
import { MyPage } from '../pages/MyPage/MyPage';
import { SignPage } from '../pages/SignPage/SignPage';


export const AppRoutes = () => {

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/sign" element={<SignPage />} />
      <Route path="/my" element={<MyPage currUser='Current User'/>} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
