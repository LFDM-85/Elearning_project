import { Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from '../pages/LandingPage/LandingPage';
import React, {Suspense, lazy} from 'react';

export const AppRoutes = () => {


  const MyPage = lazy(() => import('../pages/MyPage/MyPage').then(({MyPage}) => ({ default: MyPage})));
  const SignPage = lazy(() => import ('../pages/SignPage/SignPage').then(({SignPage}) => ({ default: SignPage})));


  return (

    <Routes>
      <Route path="/" element={<LandingPage/>}/>
      <Route path="/sign" element={
        <Suspense fallback={<div>Loading...</div>}>
          <SignPage/>
        </Suspense>
      }/>
      <Route path='/my' element={ <Suspense fallback={<div>Loading...</div>}>
        <MyPage currUser='User' />
      </Suspense>}/>
       
      
      <Route path="*" element={<Navigate to="/" />} />
        
    </Routes>

  );
};
