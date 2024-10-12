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
import { ScrollArea } from '@/components/ui/scroll-area'

import { toast } from 'sonner'

const authRepository = new AxiosRepository()
const authUseCase = new AuthUseCase(authRepository)

function SignInTeacherForm() {
  const auth = useAuth()
  const navigate = useNavigate()

  const SignInTeacherSchema = z.object({
    email: z
      .string()
      .email({ message: 'Correo electrónico inválido' }),

    password: z
      .string()
      .min(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  })

  type SignInTeacherSchemaType = z.infer<typeof SignInTeacherSchema>

  const form = useForm<SignInTeacherSchemaType>({
    resolver: zodResolver(SignInTeacherSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })


  const onSubmit: SubmitHandler<SignInTeacherSchemaType> = async (data) => {
    try {
      const response = await authUseCase.signInTeacher(data.email, data.password)
      await auth.signIn(response.data.user)
      navigate('/')
    } catch (error) {
      console.error(error)
      toast.error('Ocurrió un error al iniciar sesión')
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
        </form>
      </Form>
    </ScrollArea>
  )
}

export { SignInTeacherForm }