import { UserEntity } from '@/modules/user/domain/entity'
import { AxiosRepository } from '@/modules/auth/infrastructure/repositories/axios'
import { AuthUseCase } from '@/modules/auth/application/use_cases/auth'

import { UserType } from '@/constants/user_types'
import { LocalStorageKey } from '@/constants/localstorage'

import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

type AuthContextType = {
  user?: UserEntity
  setUser: (user: UserEntity) => void
  verifiedUser: boolean
  signIn: (user: UserEntity, alreadySuscribedToClasses?: boolean) => Promise<void>
  logout: () => Promise<void>
  alreadySuscribedToClasses?: boolean
}

const defaultAuthContext: AuthContextType = {
  user: undefined,
  setUser: () => {},
  verifiedUser: false,
  signIn: async () => {},
  logout: async () => {},
  alreadySuscribedToClasses: undefined
}

const authRepository = new AxiosRepository()
const authUseCase = new AuthUseCase(authRepository)

const AuthContext = createContext<AuthContextType>(defaultAuthContext)

type AuthProviderProps = {
  children: React.ReactNode
}

function AuthProvider({ children }: AuthProviderProps) {
  const navigate = useNavigate()

  const [user, setUser] = useState<UserEntity>()
  const [alreadySuscribedToClasses, setAlreadySuscribedToClasses] = useState<boolean>()
  const [verifiedUser, setVerifiedUser] = useState(false)
  
  useEffect(() => {
    const userLocalStorage = localStorage.getItem(LocalStorageKey.USER)

    if (userLocalStorage) {
      try {
        const alreadySuscribedToClassesLocalStorage = localStorage.getItem(LocalStorageKey.ALREADY_SUSCRIBED_TO_CLASSES)
        if (alreadySuscribedToClassesLocalStorage) {
          setAlreadySuscribedToClasses(JSON.parse(alreadySuscribedToClassesLocalStorage))
        }

        setUser(JSON.parse(userLocalStorage))
        setVerifiedUser(true)
      } catch (error) {
        console.error('Failed to parse user data from localStorage', error)
        navigate('/sign-in')
      }
    } else {
      setUser(undefined)
      setVerifiedUser(true)
    }
  }, [navigate])

  const signIn = async (userValue: UserEntity, alreadySuscribedToClasses?: boolean) => {
    if (userValue.userType === UserType.STUDENT) {
      if (alreadySuscribedToClasses === undefined) {
        await logout()
        throw new Error('alreadySuscribedToClasses is required for student users')
      }

      localStorage.setItem(LocalStorageKey.ALREADY_SUSCRIBED_TO_CLASSES, JSON.stringify(alreadySuscribedToClasses))
      setAlreadySuscribedToClasses(alreadySuscribedToClasses)
    }

    localStorage.setItem(LocalStorageKey.USER, JSON.stringify(userValue))
    setUser(userValue)
    setVerifiedUser(true)
  }

  const logout = async () => {
    await authUseCase.signOut()

    localStorage.removeItem(LocalStorageKey.ALREADY_SUSCRIBED_TO_CLASSES)
    localStorage.removeItem(LocalStorageKey.USER)
    setUser(undefined)
    setVerifiedUser(false)
    navigate('/sign-up')
  }

  const auth = {
    user,
    setUser,
    signIn,
    logout,
    verifiedUser,
    alreadySuscribedToClasses
  }

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthProvider, AuthContext }