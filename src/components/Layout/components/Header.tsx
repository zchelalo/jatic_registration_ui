import { forwardRef } from 'react'

import { NavLink } from 'react-router-dom'

const Header = forwardRef<HTMLHeadElement>((props, ref) => {
  return (
    <header
      ref={ref}
      className='bg-secondary text-secondary w-full flex justify-between items-center border-b-2 h-20 z-30 px-4'
    >
      <div className='w-full mx-auto flex justify-between items-center py-4'>
        <figure id='logo' className=''>
          <NavLink to='https://jatic.mx' className='' target='_blank'>
            <img src='https://jatic.mx/img/logo_jatic_2024_grande.png' alt='Logo' className='h-8' />
          </NavLink>
        </figure>
        <nav id='nav-menu-container'>
          <ul className='flex space-x-8'>
            <li className='mr-4 hover:decoration-orange-600'>
              <NavLink to='/' className='text-lg hover:underline underline-offset-1 decoration-orange-600'>Inicio</NavLink>
            </li>
          </ul>
        </nav>
      </div>

    </header>
  )
})

export { Header }
