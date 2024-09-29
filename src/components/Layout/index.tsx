import { useEffect, useRef, useState } from 'react'

import { Header } from '@/components/Layout/components/Header'
import { Toaster } from 'sonner'

type LayoutProps = {
  children: React.ReactNode
}

function Layout({
  children
}: LayoutProps) {

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
        {children}
      </main>

      <Toaster
        closeButton={true}
        richColors={true}
        expand={true}
      />
    </div>
  )
}

export { Layout }