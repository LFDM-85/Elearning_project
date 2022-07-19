import { Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from '../pages/LandingPage/LandingPage';
import { MyPage } from '../pages/MyPage/MyPage';
import { SignPage } from '../pages/SignPage/SignPage';
import React from 'react';

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

export const AuthContext = React.createContext(initialState);

const reducer = (state: any, action: any) => {
  switch (action.type) {
  case 'SignIn':
    localStorage.setItem('user', JSON.stringify(action.payload.user));
    localStorage.setItem('token', action.payload['access_token']);
    return {
      ...state,
      isAuthenticated: true,
      user: action.payload.user,
      token: action.payload['access_token']
    };
  case 'SignOut':
    localStorage.clear();
    return {
      ...state,
      isAuthenticated: false,
      user: null
    };
  default:
    return state;
  }
};


export const AppRoutes = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <AuthContext.Provider value={{state, dispatch}}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/sign" element={<SignPage />} />
        {state.isAuthenticated ? <Route path="/my" element={<MyPage currUser={state.user.name} />}/>: <Route path='/'/> }
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AuthContext.Provider>
  );
};
