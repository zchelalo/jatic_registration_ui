import { BrowserRouter, Routes, Route } from 'react-router-dom'


import { Layout } from '@/components/Layout'
import { Home } from '@/modules/home/ui/pages/Home'
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
          </Routes>
        </Layout>
    </BrowserRouter>
  )
}

export { Router }