import { AxiosRepository } from '@/modules/auth/infrastructure/repositories/axios'
import { AuthUseCase } from '@/modules/auth/application/use_cases/auth'
import { AxiosRepository as UtAxiosRepository } from '@/modules/ut/infrastructure/repositories/axios'
import { AxiosRepository as CareerAxiosRepository  } from '@/modules/career/infrastructure/repositories/axios'
import { UtUseCase } from '@/modules/ut/application/use_cases/ut'
import { CareerUseCase } from '@/modules/career/application/use_cases/career'
import { UtEntity } from '@/modules/ut/domain/entity'
import { CareerEntity } from '@/modules/career/domain/entity'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/auth/useAuth'
import { useNavigate } from 'react-router-dom'

import { SubmitHandler, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { ScrollArea } from '@/components/ui/scroll-area'

import { toast } from 'sonner'

const authRepository = new AxiosRepository()
const authUseCase = new AuthUseCase(authRepository)

const utRepository = new UtAxiosRepository()
const utUseCase = new UtUseCase(utRepository)

const careerRepository = new CareerAxiosRepository()
const careerUseCase = new CareerUseCase(careerRepository)

function SignUpStudentForm() {
  const auth = useAuth()
  const navigate = useNavigate()

  const [uts, setUts] = useState<UtEntity[]>()
  const [careers, setCareers] = useState<CareerEntity[]>()

  useEffect(() => {
    const fetchCareers = async () => {
      try {
        const response = await careerUseCase.listCareers(1, 100)
        setCareers(response.data)
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
        const response = await utUseCase.listUts(1, 100)
        setUts(response.data)
      } catch (error) {
        console.error(error)
        toast.error('An error occurred while trying to fetch the UTs')
      }
    }

    fetchUts()
  }, [])

  const SignUpSchema = z.object({
    registrationNumber: z
      .string()
      .min(1, { message: 'Matricula debe ser valida' }),

    confirmRegistrationNumber: z
      .string()
      .min(1, { message: 'La matricula no coincide' })
      .refine((data: string): boolean => {
        return data === form.getValues().registrationNumber
      }, { message: 'Matricula no coincide' }),

    name: z
      .string()
      .min(3, { message: 'Su nombre debe ser mayor a 3 caracteres' }),

    lastName1: z
      .string()
      .min(3, { message: 'Su apellido debe ser mayor a 3 caracteres' }),

    lastName2: z
      .string()
      .min(3, { message: 'Su apellido debe ser mayor a 3 caracteres' })
      .optional(),

    email: z
      .string()
      .email({ message: 'Correo no valido' }),

    password: z
      .string()
      .min(8, { message: 'Contraseña debe ser mayor a 8 caracteres' }),

    confirmPassword: z
      .string()
      .min(8, { message: 'Contraseña debe ser mayor a 8 caracteres' })
      .refine((data: string): boolean => {
        return data === form.getValues().password
      }, { message: 'Contraseña no coincide' }),

    utID: z
      .string()
      .min(1, { message: 'Selecciona una Universidad' }),

    careerID: z
      .string()
      .min(1, { message: 'Selecciona una carrera' }),
  })

  type SignUpSchemaType = z.infer<typeof SignUpSchema>

  const form = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      registrationNumber: '',
      confirmRegistrationNumber: '',
      name: '',
      lastName1: '',
      lastName2: '',
      email: '',
      password: '',
      confirmPassword: '',
      utID: '',
      careerID: ''
    }
  })

  const onSubmit: SubmitHandler<SignUpSchemaType> = async (data) => {
    try {
      const response = await authUseCase.signUpStudent(data.registrationNumber, data.name, data.lastName1, data.email, data.password, data.utID, data.careerID, data.lastName2)
      auth.signIn(response.data.user)
      navigate('/')
    } catch (error) {
      console.error(error)
      toast.error('An error occurred while trying to sign up')
    }
  }

  return (
    <ScrollArea className='w-full'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='w-full h-full flex flex-col items-center justify-center space-y-6 pb-4'
        >
          <FormField
            control={form.control}
            name='registrationNumber'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>
                  Matricula
                </FormLabel>
                <FormControl>
                  <Input
                    type='text'
                    placeholder='123456'
                    className='w-full back text'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='confirmRegistrationNumber'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>
                  Confirmar Matricula
                </FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    placeholder='123456'
                    className='w-full back text'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>
                  Nombre
                </FormLabel>
                <FormControl>
                  <Input
                    type='text'
                    placeholder='John Doe'
                    autoComplete='name'
                    className='w-full back text'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='lastName1'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>
                  Primera Apellido
                </FormLabel>
                <FormControl>
                  <Input
                    type='text'
                    placeholder='John Doe'
                    autoComplete='family-name'
                    className='w-full back text'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='lastName2'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>
                  Segundo Apellido
                </FormLabel>
                <FormControl>
                  <Input
                    type='text'
                    placeholder='John Doe'
                    autoComplete='family-name'
                    className='w-full back text'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>
                  Correo Electrónico
                </FormLabel>
                <FormControl>
                  <Input
                    type='email'
                    placeholder='johndoe@email.com'
                    autoComplete='email'
                    className='w-full back text'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>
                  Contraseña
                </FormLabel>
                <FormControl>
                  <Input
                    type='password'
                    placeholder='securePassword123'
                    autoComplete='new-password'
                    className='w-full back text'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='confirmPassword'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>
                  Confirmar Contraseña
                </FormLabel>
                <FormControl>
                  <Input
                    type='password'
                    placeholder='securePassword123'
                    autoComplete='new-password'
                    className='w-full back text'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='utID'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Elige de que UT nos visitas</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className='w-full bg text p-2 rounded'>
                      <SelectValue placeholder={'Universidad Tecnológica'} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {uts?.map(ut => (
                      <SelectItem key={ut.id} value={ut.id}>{ut.key}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='careerID'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Elige tu carrera</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className='w-full bg text p-2 rounded'>
                      <SelectValue placeholder={'Carrera Universitaria'} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {careers?.map(career => (
                      <SelectItem key={career.id} value={career.id}>{career.key}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type='submit'
            className='w-full btn-secondary self-center'
          >
            Registrarse
          </Button>
        </form>
      </Form>
    </ScrollArea>
  )
}

export { SignUpStudentForm }