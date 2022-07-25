import React from 'react';
// import {ContextType, IAction, IState} from '../interfaces/interfaces';
//
// const initialState = {
//   isAuthenticated: false,
//   user: null,
//   token: null,
// };
//
// export const AuthContext = React.createContext<ContextType | IState | IAction>(
//   initialState
// );
//
// const reducer = (state: IState, action: IAction) => {
//   switch (action.type) {
//   case 'SignIn':
//     localStorage.setItem('user', JSON.stringify(action.payload.user));
//     localStorage.setItem('token', action.payload['access_token']);
//     return {
//       ...state,
//       isAuthenticated: true,
//       user: action.payload.user,
//       token: action.payload['access_token'],
//     };
//
//
//   case 'SignOut':
//     localStorage.clear();
//     return {
//       ...state,
//       isAuthenticated: false,
//       user: null,
//     };
//   default:
//     return state;
//   }
//
// };
