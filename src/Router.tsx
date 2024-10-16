import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { AuthProvider } from '@/contexts/auth'
import { AuthRoute } from '@/contexts/auth/AuthRoute'
import { AdminAuthRoute } from '@/contexts/auth/AdminAuthRoute'
import { TeacherAuthRoute } from '@/contexts/auth/TeacherAuthRoute'
import { PublicRoute } from '@/contexts/auth/PublicRoute'
import { AdminPublicRoute } from '@/contexts/auth/AdminPublicRoute'

import { Layout } from '@/components/Layout'
import { AdminLayout } from '@/components/AdminLayout'
import { TeacherLayout } from '@/components/TeacherLayout'

import { SignUp } from '@/modules/auth/ui/pages/SignUp'
import { Home } from '@/modules/home/ui/pages/Home'
import { Error404 } from '@/components/Error404'

import { AdminSignIn } from '@/modules/admin/ui/pages/AdminSignIn'
import { Admin } from '@/modules/home/ui/pages/Admin'
import { Teacher } from '@/modules/teacher/ui/pages/Teacher'
import { Student } from '@/modules/student/ui/pages/Student'
import { Ut } from '@/modules/ut/ui/pages/Ut'
import { Career } from '@/modules/career/ui/pages/Career'
import { Class } from '@/modules/class/ui/pages/Class'

import { Attendance } from '@/modules/attendance/ui/pages/Attendance'
import { AttendanceClass } from '@/modules/attendance/ui/pages/AttendanceClass'

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
            <Route
              path='/admin/students'
              element={(
                <AdminAuthRoute>
                  <Student />
                </AdminAuthRoute>
              )}
            />
            <Route
              path='/admin/uts'
              element={(
                <AdminAuthRoute>
                  <Ut />
                </AdminAuthRoute>
              )}
            />
            <Route
              path='/admin/careers'
              element={(
                <AdminAuthRoute>
                  <Career />
                </AdminAuthRoute>
              )}
            />
            <Route
              path='/admin/classes'
              element={(
                <AdminAuthRoute>
                  <Class />
                </AdminAuthRoute>
              )}
            />
          </Route>

          <Route element={<TeacherLayout />}>
            <Route
              path='/attendance/*'
              element={(
                <TeacherAuthRoute>
                  <Error404 />
                </TeacherAuthRoute>
              )}
            />
            <Route
              path='/attendance/'
              element={(
                <TeacherAuthRoute>
                  <Attendance />
                </TeacherAuthRoute>
              )}
            />
            <Route
              path='/attendance/:classId'
              element={(
                <TeacherAuthRoute>
                  <AttendanceClass />
                </TeacherAuthRoute>
              )}
            />
          </Route>
        </Routes>

      </AuthProvider>
    </BrowserRouter>
  )
}

export { Router }