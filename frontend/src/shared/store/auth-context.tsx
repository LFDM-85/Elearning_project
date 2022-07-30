import React, {useState} from 'react';


const initialUser = {
  email:'',
  id:'',
  name:'',
  role: []
};

const AuthContext = React.createContext({
  token: '',
  isSignedIn: false,
  user: initialUser,
  signin: (token: string, user: any) => {/**/},
  signout: () => {/**/},

});



export const AuthContextProvider = (props: any) => {
  const [token, setToken] = useState('');
  const [user, setUser] = useState(initialUser);
  const userIsSignedIn = !!token;

  const signinHandler = (token: string, user: any) => {
    setToken(token);
    setUser({
      email: user.email,
      id: user.id,
      name: user.name,
      role: user.role,
    });
  };

  const signoutHandler = () => {
    setToken('');
    setUser(initialUser);
  };


  const contextValue = {
    token: token,
    user: user,
    isSignedIn: userIsSignedIn,
    signin: signinHandler,
    signout: signoutHandler,
  };
    
  return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>;
};

export default AuthContext;