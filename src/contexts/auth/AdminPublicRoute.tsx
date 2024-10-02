import { Navigate } from 'react-router-dom'
import { useAuth } from './useAuth'

type AdminPublicRouteProps = {
  children: React.ReactNode
}

function AdminPublicRoute({ children }: AdminPublicRouteProps) {
  const auth = useAuth()

  if (!auth.verifiedUser) {
    return null
  }

  if (auth.user) {
    return <Navigate to='/admin' />
  }

  return children
}

export { AdminPublicRoute }