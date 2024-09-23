import { BrowserRouter, Routes, Route } from 'react-router-dom'


import { Layout } from '@/components/Layout'
import { Landing } from '@/modules/landing/ui/pages/Landing'
import { Home } from '@/modules/Home/ui/Home'
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
                  <Landing />
              )}
            />
            <Route
              path='/Home'
              element={(
                  <Home />
              )}
            />
          </Routes>
        </Layout>
    </BrowserRouter>
  )
}

export { Router }