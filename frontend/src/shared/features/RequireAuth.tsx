import { useLocation, Navigate, Outlet} from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const RequireAuth = (props: any) => {
  const authCtx = useAuth();
  const location = useLocation();

  return (
    authCtx.user.role.find(role => props.allowedRoles?.includes(role))
      ? <Outlet/> 
      : authCtx?.user 
        ? <Navigate to='/unauthorized' state={{from: location}} replace />  
        : <Navigate to='/sign' state={{from: location}} replace/>);

};

export default RequireAuth;