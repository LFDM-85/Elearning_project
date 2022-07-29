import { Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from '../pages/LandingPage/LandingPage';
import React, {Suspense, lazy, useContext} from 'react';
import AuthContext from '../shared/store/auth-context';



export const AppRoutes = () => {
  const MyPage = lazy(() => import('../pages/MyPage/MyPage').then(({MyPage}) => ({ default: MyPage})));
  const SignPage = lazy(() => import ('../pages/SignPage/SignPage').then(({SignPage}) => ({ default: SignPage})));
  const authCtx = useContext(AuthContext);


  return (

    <Routes>
      {!authCtx.isSignedIn && <Route path="/" element={<LandingPage/>}/>}
      {!authCtx.isSignedIn && <Route path="/sign" element={
        <Suspense fallback={<div>Loading...</div>}>
          <SignPage/>
        </Suspense>
      }/>}
      {authCtx.isSignedIn  && <Route path='/my' element={<Suspense fallback={<div>Loading...</div>}>
        <MyPage currUser='User'/>
      </Suspense>}/>}
       
      
      <Route path="*" element={<Navigate to="/" />} />
        
    </Routes>

  );
};
