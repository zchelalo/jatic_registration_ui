import { NavLink } from 'react-router-dom'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

import {
  HiBars4,
  HiOutlineBookOpen,
  HiOutlineUsers
} from 'react-icons/hi2'

function Menu() {
  return (
    <Sheet>
      <SheetTrigger
        className='back-secondary absolute bottom-0 right-0 z-20 rounded-full p-3 mr-4 mb-4'
      >
        <HiBars4 className='text-2xl sm:text-3xl' />
      </SheetTrigger>
      <SheetContent
        side='left'
        className='back-secondary text-pretty overflow-y-auto'
      >
        <SheetHeader>
          <SheetTitle className='text-secondary p-2'>
            Zona administrativa de JATIC
          </SheetTitle>
        </SheetHeader>
        <div className='mt-3 text-pretty'>
          <ul>
            <li className='flex'>
              <NavLink
                to='/admin/teachers'
                className={({ isActive }) => `back-secondary-hover w-full flex items-center p-2 rounded ${isActive ? 'back-hover' : ''}`}
              >
                <HiOutlineBookOpen className='text-xl mr-2' /> Talleristas
              </NavLink>
            </li>
            <li className='flex'>
              <NavLink
                to='/admin/students'
                className={({ isActive }) => `back-secondary-hover w-full flex items-center p-2 rounded ${isActive ? 'back-hover' : ''}`}
              >
                <HiOutlineUsers className='text-xl mr-2' /> Estudiantes
              </NavLink>
            </li>
          </ul>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export { Menu }