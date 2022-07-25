import { Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from '../pages/LandingPage/LandingPage';
import React, {Suspense, lazy} from 'react';
import { IState, IAction, ContextType} from '../shared/interfaces/interfaces';




const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

export const AuthContext = React.createContext<ContextType | IState | IAction>(
  initialState
);

const reducer = (state: IState, action: IAction) => {
  switch (action.type) {
  case 'SignIn':

    return {
      ...state,
      isAuthenticated: true,
      user: action.payload.user,
      token: action.payload['access_token'],
    };
  case 'SignOut':
    localStorage.clear();
    return {
      ...state,
      isAuthenticated: false,
      user: null,
    };
  default:
    return state;
  }
};

export const AppRoutes = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const MyPage = lazy(() => import('../pages/MyPage/MyPage').then(({MyPage}) => ({ default: MyPage})));
  const SignPage = lazy(() => import ('../pages/SignPage/SignPage').then(({SignPage}) => ({ default: SignPage})));




  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/sign" element={
          <Suspense fallback={<div>Loading...</div>}>
            <SignPage />
          </Suspense>
        } />
        {state.isAuthenticated ? (
          <Route path="/my" element={
            <Suspense fallback={<div>Loading...</div>}>
              <MyPage currUser={state.user} />
            </Suspense>
          } />
        ) : (
          <Route path="/" />
        )}
        <Route path="*" element={<Navigate to="/" />} />
        
      </Routes>
    </AuthContext.Provider>
  );
};
