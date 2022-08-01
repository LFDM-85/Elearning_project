import { Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from '../pages/LandingPage/LandingPage';
import LayoutRoutes from '../shared/components/LayoutRoutes/LayoutRotes';
import Unauthorized from '../pages/Unauthorized/Unauthorized';
import React, { Suspense, lazy } from 'react';
import RequireAuth from '../shared/features/RequireAuth';

export const AppRoutes = () => {
  const MyPage = lazy(() =>
    import('../pages/MyPage/MyPage').then(({ MyPage }) => ({ default: MyPage }))
  );
  const SignPage = lazy(() =>
    import('../pages/SignPage/SignPage').then(({ SignPage }) => ({
      default: SignPage,
    }))
  );

  return (
    <Routes>
      <Route path="/" element={<LayoutRoutes />}>
        {/* public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/sign"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <SignPage />
            </Suspense>
          }
        />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/*  private routes */}
        {/*Separate Protected Nested Routes with every role. For now Admin, Student and Professor are allowed */}
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

        {/* catch all */}
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
};
