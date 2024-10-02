import { forwardRef } from 'react'

import { useAuth } from '@/contexts/auth/useAuth'

import { NavLink } from 'react-router-dom'

const Header = forwardRef<HTMLHeadElement>((props, ref) => {
  const auth = useAuth()

  return (
    <header
      ref={ref}
      className='back-secondary w-full flex justify-between items-center border-b-2 h-20 z-30 px-4'
    >
      <div className='w-full mx-auto flex justify-between items-center py-4'>
        <figure id='logo' className=''>
          <NavLink to='https://jatic.mx' className='' target='_blank'>
            <img src='https://jatic.mx/img/logo_jatic_2024_grande.png' alt='Logo' className='h-8' />
          </NavLink>
        </figure>
        <nav id='nav-menu-container'>
          <ul className='flex'>
            {auth.user ? (
              <>
                <li>
                  <NavLink
                    to='/'
                    className={({ isActive }) => `text-lg ${isActive ? 'underline underline-offset-4 decoration-[var(--color-quaternary)]' : ''} hover:underline hover:underline-offset-4 hover:decoration-[var(--color-quaternary)]`}
                  >
                    Inicio
                  </NavLink>
                </li>
                <li className='ml-4'>
                  <button
                    type='button'
                    className='text-lg font-normal hover:underline hover:underline-offset-4 hover:decoration-[var(--color-quaternary)]'
                    onClick={async () => {
                      auth.logout()
                    }}
                  >
                    Cerrar sesión
                  </button>
                </li>
              </>
            ) : (
              <li>
                <NavLink
                  to='/sign-up'
                  className={({ isActive }) => `text-lg ${isActive ? 'underline underline-offset-4 decoration-[var(--color-quaternary)]' : ''} hover:underline hover:underline-offset-4 hover:decoration-[var(--color-quaternary)]`}
                >
                  Iniciar sesión
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
      </div>

    </header>
  )
})

export { Header }
