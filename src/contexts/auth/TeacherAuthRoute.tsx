import { UserType } from '@/constants/user_types'
import { useAuth } from '@/contexts/auth/useAuth'

import { Navigate } from 'react-router-dom'

type TeacherAuthRouteProps = {
  children: React.ReactNode
}

function TeacherAuthRoute({ children }: TeacherAuthRouteProps) {
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

  if (auth.user.userType === UserType.STUDENT) {
    return <Navigate to='/' />
  }

  return children
}

export { TeacherAuthRoute }