import { axiosPrivate} from '../../interceptors/axios';
import { useEffect} from 'react';
import useRefreshToken from './useRefreshToken';
import useAuth from './useAuth';

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const authCtx = useAuth();

  useEffect(() =>{

    const requestIntercept = axiosPrivate.interceptors.request.use(
      config => {
        // @ts-ignore
        if(!config.headers['Authorization']) {
          // @ts-ignore
          config.headers['Authorization'] = `Bearer ${authCtx.token}`;
        }
        return config;
      }, (err) => Promise.reject(err)
    );



    const responseIntercept = axiosPrivate.interceptors.response.use(
      response => response,
      async (err) => {
        const prevRequest = err?.config;
        if(err?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newToken = await (await refresh)();
          prevRequest.headers['Authorization'] = `Bearer ${newToken}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(err);
      }
    );


    return () => {
      axiosPrivate.interceptors.response.eject(responseIntercept);
      axiosPrivate.interceptors.request.eject(requestIntercept);
    };
  }, [authCtx, refresh]);


  return axiosPrivate;
};

export default useAxiosPrivate();