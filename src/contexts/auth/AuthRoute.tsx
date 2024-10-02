import { UserType } from '@/constants/user_types'

import { useAuth } from '@/contexts/auth/useAuth'

import { Navigate } from 'react-router-dom'

type AuthRouteProps = {
  children: React.ReactNode
}

function AuthRoute({ children }: AuthRouteProps) {
  const auth = useAuth()

  if (!auth.verifiedUser) {
    return null
  }

  if (!auth.user) {
    return <Navigate to='/sign-up' />
  }

  if (auth.user.userType === UserType.ADMIN) {
    return <Navigate to='/admin/' />
  }

  return children
}

export { AuthRoute }