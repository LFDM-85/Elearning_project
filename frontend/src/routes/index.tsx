import { Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from '../pages/LandingPage/LandingPage';
// import { MyPage } from '../pages/MyPage/MyPage';
// import { SignPage } from '../pages/SignPage/SignPage';
import React, {Suspense, lazy} from 'react';



interface IUser {
  id: string;
  name: string;
  email: string;
  role: string[];
}
interface IState {
  isAuthenticated: boolean;
  user: IUser | null;
  token: string | null;
}

interface IPayload {
  user: IUser;
  access_token: string;
}

interface IAction {
  type: string;
  payload: IPayload;
}

interface ContextType {
  state: IState;
  dispatch: React.Dispatch<IAction>;
}
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
    localStorage.setItem('user', JSON.stringify(action.payload.user));
    localStorage.setItem('token', action.payload['access_token']);
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

  const token = localStorage.getItem('token');

  if(token && token === state.token) {
    state.isAuthenticated = true;
  }



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
