import React, {useState} from 'react';

const AuthContext = React.createContext({
  token: '',
  isSignedIn: false,
  signin: (token: string) => {/**/},
  signout: () => {/**/},
});

export const AuthContextProvider = (props: any) => {
  const [token, setToken] = useState('');
    
  const userIsSignedIn = !!token;

  const signinHandler = (token: string) => {
    setToken(token);
  };

  const signoutHandler = () => {
    setToken('');
  };

  const contextValue = {
    token: token,
    isSignedIn: userIsSignedIn,
    signin: signinHandler,
    signout: signoutHandler,
  };
    
  return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>;
};

export default AuthContext;