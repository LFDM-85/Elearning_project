import axios from '../../interceptors/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
  const { setUser }: any = useAuth();

  const refresh = async () => {
    const response = await axios.put('/token/refresh', {
      withCredentials: true,
    });
    setUser((prev: any) => {
      console.log(JSON.stringify(prev));
      console.log(response.data.accessToken);
      return { ...prev, accessToken: response.data.token };
    });
    return response.data.token;
  };
  return refresh;
};

export default useRefreshToken();
