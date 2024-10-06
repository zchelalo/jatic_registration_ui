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
  HiOutlineUsers,
  HiOutlineBuildingOffice2,
  HiOutlineAcademicCap,
  HiOutlineCalendarDays,
  HiOutlineCommandLine
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
                className={({ isActive }) => `w-full flex items-center p-2 rounded ${isActive ? 'back-hover' : 'back-secondary-hover'}`}
              >
                <HiOutlineBookOpen className='text-xl mr-2' /> Talleristas
              </NavLink>
            </li>
            <li className='flex'>
              <NavLink
                to='/admin/students'
                className={({ isActive }) => `w-full flex items-center p-2 rounded ${isActive ? 'back-hover' : 'back-secondary-hover'}`}
              >
                <HiOutlineUsers className='text-xl mr-2' /> Estudiantes
              </NavLink>
            </li>
            <li className='flex'>
              <NavLink
                to='/admin/uts'
                className={({ isActive }) => `w-full flex items-center p-2 rounded ${isActive ? 'back-hover' : 'back-secondary-hover'}`}
              >
                <HiOutlineBuildingOffice2 className='text-xl mr-2' /> Universidades
              </NavLink>
            </li>
            <li className='flex'>
              <NavLink
                to='/admin/careers'
                className={({ isActive }) => `w-full flex items-center p-2 rounded ${isActive ? 'back-hover' : 'back-secondary-hover'}`}
              >
                <HiOutlineAcademicCap className='text-xl mr-2' /> Carreras
              </NavLink>
            </li>
            <li className='flex'>
              <NavLink
                to='/admin/classes'
                className={({ isActive }) => `w-full flex items-center p-2 rounded ${isActive ? 'back-hover' : 'back-secondary-hover'}`}
              >
                <HiOutlineCommandLine className='text-xl mr-2' /> Talleres
              </NavLink>
            </li>
            <li className='flex'>
              <NavLink
                to='/admin/dates'
                className={({ isActive }) => `w-full flex items-center p-2 rounded ${isActive ? 'back-hover' : 'back-secondary-hover'}`}
              >
                <HiOutlineCalendarDays className='text-xl mr-2' /> Fechas
              </NavLink>
            </li>
          </ul>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export { Menu }