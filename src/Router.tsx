import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { AuthProvider } from './contexts/auth'
import { AuthRoute } from './contexts/auth/AuthRoute'
import { PublicRoute } from './contexts/auth/PublicRoute'

import { Layout } from '@/components/Layout'
import { SignUp } from '@/modules/auth/ui/pages/SignUp'
import { Home } from '@/modules/home/ui/pages/Home'
import { Error404 } from '@/components/Error404'

function Router() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route
              path='*'
              element={(
                <Error404 />
              )}
            />
            <Route
              path='/sign-up'
              element={(
                <PublicRoute>
                  <SignUp />
                </PublicRoute>
              )}
            />
            <Route
              path='/'
              element={(
                <AuthRoute>
                  <Home />
                </AuthRoute>
              )}
            />
          </Routes>
        </Layout>
      </AuthProvider>
    </BrowserRouter>
  )
}

export { Router }