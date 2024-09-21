import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { SignIn } from '@/modules/auth/ui/pages/SignIn'
import { SignUp } from '@/modules/auth/ui/pages/SignUp'



enum Tab {
  REGISTRARSE = 'registrarse',
  INICIAR_SESION = 'iniciarSesion',
  ASISTENCIA = 'asistencia'
}


function Home() {
  return (
    <>
      <div className='h-screen w-full flex justify-center items-center p-6'>
        <div className='w-1/3 bg-secondary flex h-full rounded-lg p-4'>
          <Tabs defaultValue='account' className='h-full w-full'>
            <TabsList className='flex justify-between w-full bg-transparent items-start mb-4'>
              <TabsTrigger value={Tab.REGISTRARSE} className='w-1/3 m-1 text-lg rounded text-white hover:bg-slate-200 hover:text-black'>
                Regístrate
              </TabsTrigger>
              <TabsTrigger value={Tab.INICIAR_SESION} className='w-1/3 m-1 text-lg rounded text-white hover:bg-slate-200 hover:text-black'>Iniciar sesión</TabsTrigger>
              <TabsTrigger value={Tab.ASISTENCIA} className='w-1/3 m-1 text-lg rounded text-white hover:bg-slate-200 hover:text-black'>Asistencia</TabsTrigger>
            </TabsList>
            <div className='p-2'>
              <TabsContent value={Tab.REGISTRARSE}>
                <SignUp />
              </TabsContent>
              <TabsContent value={Tab.INICIAR_SESION}>
                <SignIn />
              </TabsContent>
              <TabsContent value={Tab.ASISTENCIA}>Haz cambios en tu cuenta aquí.</TabsContent>
            </div>
          </Tabs>
        </div>
        <div className='w-2/3 flex items-center justify-center h-full'>
          <img src="https://jatic.mx/img/logo_jatic_2024_grande.png" alt="logo_jatic_2024_grande" className="max-h-full" />
        </div>
      </div>
    </>
  )
}

export { Home }