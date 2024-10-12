import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { SignInStudentForm } from '@/modules/auth/ui/SignInStudentForm'
import { SignInTeacherForm } from '@/modules/auth/ui/SignInTeacherForm'
import { SignUpStudentForm } from '@/modules/auth/ui/SignUpStudentForm'

import jatic from '@/assets/images/jatic.png'
import utn from '@/assets/images/utn.png'
import utnTi from '@/assets/images/utn_ti_clean.png'
import utEtchojoa from '@/assets/images/utetchojoa_clean.png'
import utHermosillo from '@/assets/images/uthermosillo_clean.png'
import utPuertoPeñasco from '@/assets/images/utpuerto_peñasco.png'
import uts from '@/assets/images/uts.png'
import utslrc from '@/assets/images/utslrc.png'

enum Tab {
  REGISTRARSE = 'registrarse',
  INICIAR_SESION = 'iniciarSesion',
  ASISTENCIA = 'asistencia'
}

function SignUp() {
  return (
    <div className='h-auto sm:h-full w-full flex flex-col sm:flex-row justify-center items-center p-4 sm:p-6'>
      <div className='back-secondary w-full md:w-6/12 lg:w-5/12 xl:w-4/12 flex h-auto sm:h-full rounded-lg p-2 sm:p-4 sm:overflow-y-auto'>
        <Tabs defaultValue={Tab.REGISTRARSE} className='h-auto sm:h-full w-full'>

          <TabsList className='flex justify-between w-full bg-transparent items-start'>
            <TabsTrigger value={Tab.REGISTRARSE} className='w-1/3 text-sm md:text-sm lg:text-lg rounded text-[var(--color-primary)] hover:text-[var(--color-secondary)] bg-transparent hover:bg-[var(--color-primary)]'>
              Regístrate
            </TabsTrigger>
            <TabsTrigger value={Tab.INICIAR_SESION} className='w-1/3 text-sm md:text-sm lg:text-lg rounded text-[var(--color-primary)] hover:text-[var(--color-secondary)] bg-transparent hover:bg-[var(--color-primary)]'>
              Iniciar sesión
            </TabsTrigger>
            <TabsTrigger value={Tab.ASISTENCIA} className='w-1/3 text-sm md:text-sm lg:text-lg rounded text-[var(--color-primary)] hover:text-[var(--color-secondary)] bg-transparent hover:bg-[var(--color-primary)]'>
              Asistencia
            </TabsTrigger>
          </TabsList>

          <div className='p-2'>
            <TabsContent value={Tab.REGISTRARSE}>
              <SignUpStudentForm />
            </TabsContent>
            <TabsContent value={Tab.INICIAR_SESION}>
              <SignInStudentForm />
            </TabsContent>
            <TabsContent value={Tab.ASISTENCIA}>
              <SignInTeacherForm />
            </TabsContent>
          </div>

        </Tabs>
      </div>
      <section className='back w-full md:w-6/12 lg:w-7/12 xl:w-8/12 flex flex-wrap items-center justify-center h-full p-4'>
        <div className='w-11/12 sm:w-10/12 md:w-10/12 lg:w-8/12 xl:w-9/12 flex flex-wrap items-center justify-center'>
          <figure className='w-full flex items-center justify-center p-8 sm:p-4'>
            <img
              src={jatic}
              alt='Logo de JATIC'
              className='max-h-full filter drop-shadow-xl'
            />
          </figure>
          <figure className='w-6/12 sm:w-6/12 md:w-4/12 lg:w-3/12 xl:w-2/12 flex items-center justify-center p-8 sm:p-4'>
            <img
              src={utEtchojoa}
              alt='Logo de UT Etchojoa'
              className='max-h-full filter drop-shadow-xl'
            />
          </figure>
          <figure className='w-6/12 sm:w-6/12 md:w-4/12 lg:w-3/12 xl:w-2/12 flex items-center justify-center p-8 sm:p-4'>
            <img
              src={utHermosillo}
              alt='Logo de UT Hermosillo'
              className='max-h-full filter drop-shadow-xl'
            />
          </figure>
          <figure className='w-6/12 sm:w-6/12 md:w-4/12 lg:w-3/12 xl:w-2/12 flex items-center justify-center p-8 sm:p-4'>
            <img
              src={utPuertoPeñasco}
              alt='Logo de UT Puerto Peñasco'
              className='max-h-full filter drop-shadow-xl'
            />
          </figure>
          <figure className='w-6/12 sm:w-6/12 md:w-4/12 lg:w-3/12 xl:w-2/12 flex items-center justify-center p-8 sm:p-4'>
            <img
              src={uts}
              alt='Logo de UT Sur de Sonora'
              className='max-h-full filter drop-shadow-xl'
            />
          </figure>
          <figure className='w-6/12 sm:w-6/12 md:w-4/12 lg:w-3/12 xl:w-2/12 flex items-center justify-center p-8 sm:p-4'>
            <img
              src={utslrc}
              alt='Logo de UT San Luis Río Colorado'
              className='max-h-full filter drop-shadow-xl'
            />
          </figure>
          <figure className='w-6/12 sm:w-6/12 md:w-4/12 lg:w-3/12 xl:w-2/12 flex items-center justify-center p-8 sm:p-4'>
            <img
              src={utn}
              alt='Logo de UT Nogales'
              className='max-h-full filter drop-shadow-xl'
            />
          </figure>
          <figure className='w-6/12 sm:w-6/12 md:w-4/12 lg:w-3/12 xl:w-2/12 flex items-center justify-center p-8 sm:p-4'>
            <img
              src={utnTi}
              alt='Logo de TI UTN'
              className='max-h-full filter drop-shadow-xl'
            />
          </figure>
        </div>
      </section>
    </div>
  )
}

export { SignUp }