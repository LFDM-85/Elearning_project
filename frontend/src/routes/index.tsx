import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { LandingPage } from '../pages/LandingPage/LandingPage';
import LayoutRoutes from '../shared/components/LayoutRoutes/LayoutRotes';
import Unauthorized from '../pages/Unauthorized/Unauthorized';
import { Suspense, lazy, useEffect, useState } from 'react';
import RequireAuth from '../shared/features/RequireAuth';
import axios from '../interceptors/axios';
export const AppRoutes = () => {
  const [signedUser, setSignedUser] = useState(false);
  const navigate = useNavigate();
  const MyPage = lazy(() =>
    import('../pages/MyPage/MyPage').then(({ MyPage }) => ({ default: MyPage }))
  );
  const SignPage = lazy(() =>
    import('../pages/SignPage/SignPage').then(({ SignPage }) => ({
      default: SignPage,
    }))
  );

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated) {
      axios
        .get('auth/whoami', {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        })
        .then((res) => {
          console.log(res.data);
          const signUser = res.data;

          if (signUser) {
            setSignedUser(true);
            navigate('/my', { replace: true });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<LayoutRoutes />}>
        {/* public routes */}
        <Route path="/" element={<LandingPage />} />
        {signedUser && (
          <Route
            path="/sign"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <SignPage />
              </Suspense>
            }
          />
        )}
        {!signedUser && (
          <Route path="/unauthorized" element={<Unauthorized />} />
        )}

        {/*  private routes */}
        {/*Separate Protected Nested Routes with every role. For now Admin, Student and Professor are allowed */}
        {signedUser && (
          <Route
            element={
              <RequireAuth allowedRoles={['admin', 'student', 'professor']} />
            }
          >
            <Route
              path="/my"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <MyPage currUser={'User'} />
                </Suspense>
              }
            />
          </Route>
        )}

        {/* catch all */}
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
};
