import { useContext } from 'react';
import AuthContext from '../store/auth-context';

const useAuth = () => {
  const { user } = useContext(AuthContext);
  return useContext(AuthContext);
};

export default useAuth;
