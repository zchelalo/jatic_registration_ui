import { useEffect, useRef, useState } from 'react'
import { useAuth } from '@/contexts/auth/useAuth'

import { Outlet } from 'react-router-dom'
import { Header } from '@/components/AdminLayout/components/Header'
import { Menu } from '@/components/AdminLayout/components/Menu'
import { Toaster } from 'sonner'

function AdminLayout() {
  const auth = useAuth()

  const [headerHeight, setHeaderHeight] = useState(0)
  const headerRef = useRef<HTMLHeadElement>(null)

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight)
    }
  }, [headerRef])

  return (
    <div className='min-h-screen relative back flex flex-col'>
      <Header ref={headerRef} />

      <main
        className='w-full flex flex-col text-pretty overflow-y-auto'
        style={{ height: `calc(100vh - ${headerHeight}px)` }}
      >
        <Outlet />
      </main>

      {auth.user ? <Menu /> : undefined}

      <Toaster
        closeButton={true}
        richColors={true}
        expand={true}
      />
    </div>
  )
}

export { AdminLayout }