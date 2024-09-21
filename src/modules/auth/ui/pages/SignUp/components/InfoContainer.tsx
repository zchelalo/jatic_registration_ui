import { Form } from '@/modules/auth/ui/pages/SignUp/components/Form'

function InfoContainer() {
  return (
    <div>
      <div>
        <div className='my-6 text-center'>
          <h1 className='mb-2 text-2xl sm:text-4xl font-bold'>
            Registrate
          </h1>
          <span>¡Register para unirte al evento!</span>
        </div>
        <Form />
      </div>
    </div>
  )
}

export { InfoContainer }
