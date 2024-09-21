import { forwardRef } from 'react'

import { NavLink } from 'react-router-dom'

const Header = forwardRef<HTMLHeadElement>((props, ref) => {
  return (
    <header
      ref={ref}
      className='bg-secondary text-secondary w-full flex justify-between items-center border-b-2 h-20 z-30'
    >
      <div className="container mx-auto flex justify-between items-center py-4 px-4">
        <div id="logo" className="flex-shrink-0">
          <a href="#intro" className="scrollto">
            <img src="https://jatic.mx/img/logo_jatic_2024_grande.png" alt="Logo" className="h-12" />
          </a>
        </div>

        {/* Navigation Menu */}
        <nav id="nav-menu-container">
          <ul className="flex space-x-8">
            <li className='mr-4 hover:decoration-orange-600'>
              <NavLink to='/' className='text-lg hover:underline underline-offset-1 decoration-orange-600'>Home</NavLink>
            </li>
            <li className='mr-4'>
              <NavLink to='/acerca-de-jatic' className='text-lg hover:underline underline-offset-1 decoration-orange-600'>Acerca de Jatic</NavLink>
            </li>
            <li className='mr-4'>
              <NavLink to='/sign-in' className='text-lg hover:underline underline-offset-1 decoration-orange-600'>Sign in</NavLink>
            </li>
            <li className='mr-4'>
              <NavLink to='/sign-up' className='text-lg hover:underline underline-offset-1 decoration-orange-600'>Sign up</NavLink>
            </li>
          </ul>
        </nav>
      </div>

    </header>
  )
})

export { Header }
