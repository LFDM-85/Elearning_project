import axios from '../../interceptors/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
  const authCtx = useAuth();

  const refresh = async () => {
    const response = await axios.get('/auth/user', {withCredentials : true});
    authCtx.token = response.data.user.token;

    return response.data.user.token;
  };
  return refresh;
};

export default useRefreshToken();
