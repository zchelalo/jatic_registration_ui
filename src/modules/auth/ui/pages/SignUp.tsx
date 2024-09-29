import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { SignInStudentForm } from '@/modules/auth/ui/SignInStudentForm'
import { SignInTeacherForm } from '@/modules/auth/ui/SignInTeacherForm'
import { SignUpStudentForm } from '@/modules/auth/ui/SignUpStudentForm'

enum Tab {
  REGISTRARSE = 'registrarse',
  INICIAR_SESION = 'iniciarSesion',
  ASISTENCIA = 'asistencia'
}

function SignUp() {
  return (
    <div className='h-full w-full flex justify-center items-center p-4 sm:p-6'>
      <div className='back-secondary w-full md:w-6/12 lg:w-5/12 xl:w-4/12 flex h-full rounded-lg p-2 sm:p-4 overflow-y-auto'>
        <Tabs defaultValue={Tab.REGISTRARSE} className='h-full w-full'>

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
      <div className='back md:w-6/12 lg:w-7/12 xl:w-8/12 hidden md:flex items-center justify-center h-full p-4'>
        <img src='https://jatic.mx/img/logo_jatic_2024_grande.png' alt='logo_jatic_2024_grande' className='max-h-full' />
      </div>
    </div>
  )
}

export { SignUp }