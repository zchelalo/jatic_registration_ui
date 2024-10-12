import { AxiosRepository } from '@/modules/auth/infrastructure/repositories/axios'
import { AuthUseCase } from '@/modules/auth/application/use_cases/auth'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { useAuth } from '@/contexts/auth/useAuth'
import { useNavigate } from 'react-router-dom'

import { SubmitHandler, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { toast } from 'sonner'

const authRepository = new AxiosRepository()
const authUseCase = new AuthUseCase(authRepository)

function AdminSignIn() {
  const auth = useAuth()
  const navigate = useNavigate()

  const SignInAdminSchema = z.object({
    email: z
      .string()
      .email({ message: 'Invalid email address' }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' }),
  })

  type SignInAdminSchemaType = z.infer<typeof SignInAdminSchema>

  const form = useForm<SignInAdminSchemaType>({
    resolver: zodResolver(SignInAdminSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })


  const onSubmit: SubmitHandler<SignInAdminSchemaType> = async (data) => {
    try {
      const response = await authUseCase.signInAdmin(data.email, data.password)
      await auth.signIn(response.data)
      navigate('/admin/')
    } catch (error) {
      console.error(error)
      toast.error('Ocurrió un error al iniciar sesión')
    }
  }

  return (
    <div className='w-full h-full flex justify-center'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='w-full flex flex-col items-center justify-center p-4'
        >
          <div className='back-secondary w-full sm:w-7/12 md:w-5/12 lg:w-4/12 xl:w-3/12 flex flex-col p-6 rounded space-y-6 shadow-xl'>
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
            <Button
              type='submit'
              className='w-full btn-secondary self-center'
            >
              Iniciar Sesión
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export { AdminSignIn }