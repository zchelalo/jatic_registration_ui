import { BrowserRouter, Routes, Route } from 'react-router-dom'


import { Layout } from '@/components/Layout'
import { Home } from '@/modules/home/ui/pages/Home'
import { SignIn } from '@/modules/auth/ui/pages/SignIn'
import { SignUp } from '@/modules/auth/ui/pages/SignUp'
import { Error404 } from '@/components/Error404'

function Router() {
  return (
    <BrowserRouter>
        <Layout>
          <Routes>
            <Route
              path='*'
              element={(
                <Error404 />
              )}
            />
            <Route
              path='/'
              element={(
                  <Home />
              )}
            />
            <Route
              path='/sign-in'
              element={(
                  <SignIn />
              )}
            />
            <Route
              path='/sign-up'
              element={(
                  <SignUp />
              )}
            />
          </Routes>
        </Layout>
    </BrowserRouter>
  )
}

export { Router }