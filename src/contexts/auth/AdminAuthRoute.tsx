import { UserType } from '@/constants/user_types'
import { useAuth } from '@/contexts/auth/useAuth'

import { Navigate } from 'react-router-dom'

type AdminAuthRouteProps = {
  children: React.ReactNode
}

function AdminAuthRoute({ children }: AdminAuthRouteProps) {
  const auth = useAuth()

  if (!auth.verifiedUser) {
    return null
  }

  if (!auth.user) {
    return <Navigate to='/admin/sign-in' />
  }

  if (auth.user.userType !== UserType.ADMIN) {
    return <Navigate to='/' />
  }

  return children
}

export { AdminAuthRoute }