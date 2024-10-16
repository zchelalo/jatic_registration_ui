import { useEffect, useRef, useState } from 'react'

import { Outlet } from 'react-router-dom'
import { Header } from '@/components/TeacherLayout/components/Header'
import { Toaster } from 'sonner'

function TeacherLayout() {
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

      <Toaster
        closeButton={true}
        richColors={true}
        expand={true}
      />
    </div>
  )
}

export { TeacherLayout }