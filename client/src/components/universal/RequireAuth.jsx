import { useLocation, Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '../../features/store'

const RequireAuth = () => {
  //variables
  const { userInfo } = useAppSelector(state => state.manageAccount)

  const { pathname } = useLocation()

  return userInfo ? <Outlet /> : <Navigate to="/login" state={{ from: pathname }} replace />
}

export default RequireAuth
