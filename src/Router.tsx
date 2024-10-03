import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { AuthProvider } from './contexts/auth'
import { AuthRoute } from './contexts/auth/AuthRoute'
import { AdminAuthRoute } from './contexts/auth/AdminAuthRoute'
import { PublicRoute } from './contexts/auth/PublicRoute'
import { AdminPublicRoute } from './contexts/auth/AdminPublicRoute'

import { Layout } from '@/components/Layout'
import { AdminLayout } from '@/components/AdminLayout'

import { SignUp } from '@/modules/auth/ui/pages/SignUp'
import { Home } from '@/modules/home/ui/pages/Home'
import { Error404 } from '@/components/Error404'

import { AdminSignIn } from '@/modules/admin/ui/pages/AdminSignIn'
import { Admin } from '@/modules/home/ui/pages/Admin'
import { Teacher } from '@/modules/teacher/ui/pages/Teacher'

function Router() {
  return (
    <BrowserRouter>
      <AuthProvider>

        <Routes>
          <Route element={<Layout />}>
            <Route
              path='/*'
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
          </Route>

          <Route element={<AdminLayout />}>
            <Route
              path='/admin/*'
              element={(
                <AdminAuthRoute>
                  <Error404 />
                </AdminAuthRoute>
              )}
            />
            <Route
              path='/admin/sign-in'
              element={(
                <AdminPublicRoute>
                  <AdminSignIn />
                </AdminPublicRoute>
              )}
            />
            <Route
              path='/admin/'
              element={(
                <AdminAuthRoute>
                  <Admin />
                </AdminAuthRoute>
              )}
            />
            <Route
              path='/admin/teachers'
              element={(
                <AdminAuthRoute>
                  <Teacher />
                </AdminAuthRoute>
              )}
            />
          </Route>
        </Routes>

      </AuthProvider>
    </BrowserRouter>
  )
}

export { Router }