import { MemoryRepository } from '@/modules/auth/infrastructure/repositories/memory'
import { AuthUseCase } from '@/modules/auth/application/use_cases/auth'
import { MemoryRepository as UtMemoryRepository } from '@/modules/ut/infrastructure/repositories/memory'
import { MemoryRepository as CareerMemoryRepository  } from '@/modules/career/infrastructure/repositories/memory'
import { UtUseCase } from '@/modules/ut/application/use_cases/ut'
import { CareerUseCase } from '@/modules/career/application/use_cases/career'
import { UtEntity } from '@/modules/ut/domain/entity'
import { CareerEntity } from '@/modules/career/domain/entity'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { useAuth } from '@/contexts/auth/useAuth'
import { useState, useEffect } from 'react'

import { SubmitHandler, useForm } from 'react-hook-form'

import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { ErrorForm } from '@/components/ErrorForm'
import { toast } from 'sonner'

const authRepository = new MemoryRepository()
const authUseCase = new AuthUseCase(authRepository)

const utRepository = new UtMemoryRepository()
const utUseCase = new UtUseCase(utRepository)

const careerRepository = new CareerMemoryRepository()
const careerUseCase = new CareerUseCase(careerRepository)

function SignUpStudentForm() {

  const [uts, setUts] = useState<UtEntity[]>()
  const [careers, setCareers] = useState<CareerEntity[]>()

  useEffect(() => {
    const fetchCareers = async () => {
      try {
        const response = await careerUseCase.listCareers(1, 10)
        setCareers(response)
      } catch (error) {
        console.error(error)
        toast.error('An error occurred while trying to fetch the careers')
      }
    }

    fetchCareers()
  }, [])

  useEffect(() => {
    const fetchUts = async () => {
      try {
        const response = await utUseCase.listUts(1, 10)
        setUts(response)
      } catch (error) {
        console.error(error)
        toast.error('An error occurred while trying to fetch the UTs')
      }
    }

    fetchUts()
  }, [])

  const auth = useAuth()

  const SignUpSchema = z.object({

    registrationNumber: z.string().min(1, { message: 'Matricula debe ser valida' }),
    name: z.string().min(3, { message: 'Su nombre debe ser mayor a 3 caracteres' }),
    lastName1: z.string().min(3, { message: 'Su apellido debe ser mayor a 3 caracteres' }),
    lastName2: z.string().min(3, { message: 'Su apellido debe ser mayor a 3 caracteres' }).optional(),
    email: z.string().email({ message: 'Correo no valido' }),
    password: z.string().min(8, {
      message: 'Contraseña debe ser mayor a 8 caracteres'
    }),
    registrationNumberConfirm: z.string().min(1, {
      message: 'La matricula no coincide'
    }).refine((data: string): boolean => {
      return data === getValues().registrationNumber
    }, {
      message: 'Matricula no coincide'
    }),
    utID: z.string().min(1, { message: 'Selecciona una Universidad' }),
    careerID: z.string().min(1, { message: 'Selecciona una carrera' }),
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
      registrationNumber: '',
      name: '',
      lastName1: '',
      lastName2: '',
      email: '',
      password: '',
      registrationNumberConfirm: '',
      utID: '',
      careerID: ''
    }
  })

  const onSubmit: SubmitHandler<SignUpSchemaType> = async (data) => {
    try {
      const response = await authUseCase.signUpStudent(data.registrationNumber, data.name, data.lastName1, data.email, data.password, data.utID, data.careerID, data.lastName2)
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
          type='number'
          id='registrationNumber'
          placeholder='123456'
          className='w-full'
          {...register('registrationNumber')}
        />
        {errors.registrationNumber ? <ErrorForm>{errors.registrationNumber.message}</ErrorForm> : undefined}
      </div>
      <div className='w-full flex flex-col justify-center mt-3'>
        <label htmlFor='confirmMatricula' className='mb-1 sm:text-lg'>
          Confirma tu Matricula
        </label>
        <Input
          type='number'
          id='registrationNumberConfirm'
          placeholder='123456'
          className='w-full'
          {...register('registrationNumberConfirm')}
        />
        {errors.registrationNumberConfirm ? <ErrorForm>{errors.registrationNumberConfirm.message}</ErrorForm> : undefined}
      </div>
      <div className='w-full flex flex-col justify-center mt-3'>
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
      <div className='w-full flex flex-col justify-center mt-3'>
        <label htmlFor='name' className='mb-1 sm:text-lg'>
          Primer apellido
        </label>
        <Input
          type='text'
          id='lastName1'
          autoComplete='family-name'
          placeholder='John Doe'
          className='w-full'
          {...register('lastName1')}
        />
        {errors.lastName1 ? <ErrorForm>{errors.lastName1.message}</ErrorForm> : undefined}
      </div>
      <div className='w-full flex flex-col justify-center mt-3'>
        <label htmlFor='name' className='mb-1 sm:text-lg'>
          Segundo apellido
        </label>
        <Input
          type='text'
          id='lastName2'
          autoComplete='family-name'
          placeholder='John Doe'
          className='w-full'
          {...register('lastName2')}
        />
        {errors.lastName2 ? <ErrorForm>{errors.lastName2.message}</ErrorForm> : undefined}
      </div>
      <div className='w-full flex flex-col justify-center mt-3'>
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
      <div className='w-full flex flex-col justify-center mt-3'>
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
      <div className='w-full flex flex-col justify-center mt-3'>
        <label htmlFor='password' className='mb-1 sm:text-lg'>
          Elige de que UT nos visitas
        </label>
        <select
          className='w-full bg text p-2 rounded'
          {...register('utID')}
        >
          { uts?.map((ut) => (
            <option key={ut.id} value={ut.id}>{ut.key}</option>
          ))}
        </select>
      </div>
      <div className='w-full flex flex-col justify-center mt-3'>
        <label htmlFor='password' className='mb-1 sm:text-lg'>
          Elige tu carrera
        </label>
        <select
          className='w-full bg text p-2 rounded'
          {...register('careerID')}
        >
          { careers?.map((career) => (
            <option key={career.id} value={career.id}>{career.key}</option>
          ))}
        </select>
      </div>
      <Button
        type='submit'
        className='w-full bg-hover self-center my-5'
      >
        Sign Up
      </Button>
    </form>
  )
}

export { SignUpStudentForm }