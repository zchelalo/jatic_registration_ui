import { AxiosRepository } from '@/modules/auth/infrastructure/repositories/axios'
import { AuthUseCase } from '@/modules/auth/application/use_cases/auth'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { useAuth } from '@/contexts/auth/useAuth'

import { SubmitHandler, useForm } from 'react-hook-form'

import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { ErrorForm } from '@/components/ErrorForm'
import { toast } from 'sonner'

const authRepository = new AxiosRepository()
const authUseCase = new AuthUseCase(authRepository)

function Form() {

  const auth = useAuth()

  const SignUpSchema = z.object({
    matricula: z.string().min(3, { message: 'Matricula must be at least 3 characters long' }),
    name: z.string().min(3, { message: 'Name must be at least 3 characters long' }),
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(8, {
      message: 'Password must be at least 8 characters long'
    }),
    confirmMatricula: z.string().min(8, {
      message: 'Password must be at least 8 characters long'
    }).refine((data: string): boolean => {
      return data === getValues().matricula
    }, {
      message: 'Matricula do not match'
    }),
    university: z.string().min(3, { message: 'University must be at least 3 characters long' }),
  })

  type SignUpSchemaType = z.infer<typeof SignUpSchema>

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmMatricula: ''
    }
  })

  const onSubmit: SubmitHandler<SignUpSchemaType> = async (data) => {
    try {
      const response = await authUseCase.signUp(data.email, data.password, data.name)
      auth.signIn(response)

    } catch (error) {
      console.error(error)
      toast.error('An error occurred while trying to sign up')
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='w-full flex flex-col items-center justify-center'
    >
      <div className='w-full flex flex-col justify-center'>
        <label htmlFor='matricula' className='mb-1 sm:text-lg'>
          Matricula
        </label>
        <Input
          type='text'
          id='matricula'
          autoComplete='matricula'
          placeholder='123456'
          className='w-full'
          {...register('matricula')}
        />
        {errors.matricula ? <ErrorForm>{errors.matricula.message}</ErrorForm> : undefined}
      </div>
      <div className='w-full flex flex-col justify-center mt-4'>
        <label htmlFor='confirmMatricula' className='mb-1 sm:text-lg'>
          Confirma tu Matricula
        </label>
        <Input
          type='text'
          id='confirmMatricula'
          autoComplete='matricula'
          placeholder='123456'
          className='w-full'
          {...register('confirmMatricula')}
        />
        {errors.confirmMatricula ? <ErrorForm>{errors.confirmMatricula.message}</ErrorForm> : undefined}
      </div>
      <div className='w-full flex flex-col justify-center'>
        <label htmlFor='name' className='mb-1 sm:text-lg'>
          Nombre
        </label>
        <Input
          type='text'
          id='name'
          autoComplete='name'
          placeholder='John Doe'
          className='w-full'
          {...register('name')}
        />
        {errors.name ? <ErrorForm>{errors.name.message}</ErrorForm> : undefined}
      </div>
      <div className='w-full flex flex-col justify-center mt-4'>
        <label htmlFor='email' className='mb-1 sm:text-lg'>
          Correo
        </label>
        <Input
          type='email'
          id='email'
          autoComplete='email'
          placeholder='johndoe@email.com'
          className='w-full'
          {...register('email')}
        />
        {errors.email ? <ErrorForm>{errors.email.message}</ErrorForm> : undefined}
      </div>
      <div className='w-full flex flex-col justify-center mt-4'>
        <label htmlFor='password' className='mb-1 sm:text-lg'>
          Contraseña
        </label>
        <Input
          type='password'
          id='password'
          autoComplete='new-password'
          placeholder='securePassword123'
          className='w-full'
          {...register('password')}
        />
        {errors.password ? <ErrorForm>{errors.password.message}</ErrorForm> : undefined}
      </div>
      <div className='w-full flex flex-col justify-center mt-4'>
        <label htmlFor='password' className='mb-1 sm:text-lg'>
          Elige de que UT nos visitas
        </label>
        <select
          className='w-full bg text p-2 rounded'
          {...register('university')}
        >
          <option value='UTO'>UTO</option>
          <option value='UTH'>UTH</option>
          <option value='UTO'>UTO</option>
          <option value='UTN'>UTN</option>
          <option value='utvt'>UTN</option>
          <option value='utvt'>UTN</option>
          <option value='utvt'>UTN</option>
          <option value='utvt'>UTN</option>
        </select>

      </div>
      <Button
        type='submit'
        className='bg-hover self-center my-8'
      >
        Sign Up
      </Button>
    </form>
  )
}

export { Form }