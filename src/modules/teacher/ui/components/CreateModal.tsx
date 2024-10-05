import { TeacherEntity } from '@/modules/teacher/domain/entity'
import { TeacherUseCase } from '@/modules/teacher/application/use_cases/teacher'
import { AxiosRepository } from '@/modules/teacher/infrastructure/repositories/axios'

import { toast } from 'sonner'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { SubmitHandler, useForm } from 'react-hook-form'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog'
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

const teacherRepository = new AxiosRepository()
const teacherUseCase = new TeacherUseCase(teacherRepository)

type CreateModalProps = {
  openCreateModal: boolean
  setOpenCreateModal: (open: boolean) => void
  teachers: TeacherEntity[]
  setTeachers: (teachers: TeacherEntity[]) => void
}

function CreateModal({
  openCreateModal,
  setOpenCreateModal,
  teachers,
  setTeachers
}: CreateModalProps) {
  const CreateTeacherSchema = z.object({
    profile: z
      .string()
      .min(3, { message: 'El perfil debe tener al menos 3 caracteres' }),

    name: z
      .string()
      .min(3, { message: 'El nombre debe tener al menos 3 caracteres' }),

    lastName1: z
      .string()
      .min(3, { message: 'El primer apellido debe tener al menos 3 caracteres' }),

    lastName2: z
      .string()
      .refine(val => val === '' || val.length >= 3, {
        message: 'Password must be at least 8 characters long',
      }),

    email: z
      .string()
      .email({ message: 'Correo electrónico inválido' }),

    password: z
      .string()
      .min(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  })

  type CreateTeacherSchemaType = z.infer<typeof CreateTeacherSchema>

  const form = useForm<CreateTeacherSchemaType>({
    resolver: zodResolver(CreateTeacherSchema),
    defaultValues: {
      profile: '',
      name: '',
      lastName1: '',
      lastName2: '',
      email: '',
      password: ''
    }
  })

  const onSubmit: SubmitHandler<CreateTeacherSchemaType> = async (data) => {
    try {
      const lastName2 = data.lastName2 === '' ? undefined : data.lastName2

      const newTeacher = await teacherUseCase.createTeacher(
        data.profile,
        data.name,
        data.lastName1,
        data.email,
        data.password,
        lastName2
      )

      let newTeachers 
      if (teachers.length >= 10) {
        newTeachers = [newTeacher.data, ...teachers.slice(0, 9)]
      } else {
        newTeachers = [newTeacher.data, ...teachers]
      }

      setTeachers(newTeachers)
      setOpenCreateModal(false)
      form.reset()

      toast.success('Tallerista creado exitosamente')
    } catch (error) {
      setOpenCreateModal(false)
      form.reset()

      console.error(error)
      toast.error('Un error ocurrió al intentar crear el tallerista')
    }
  }

  return (
    <Dialog
      open={openCreateModal}
    >
      <DialogContent className='back w-10/12 sm:w-full max-h-[80vh] overflow-y-auto rounded'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <DialogHeader>
              <DialogTitle>
                Crear tallerista
              </DialogTitle>
              <DialogDescription>
                Una vez creado el tallerista, podrá iniciar sesión con el correo electrónico y la contraseña que se le asignen
              </DialogDescription>
            </DialogHeader>

            <div className='flex flex-col my-6 space-y-4'>
              <FormField
                control={form.control}
                name='profile'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>
                      Perfil del tallerista
                    </FormLabel>
                    <FormControl>
                      <Input
                        type='text'
                        placeholder='Él es una persona muy habilidosa'
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
                        placeholder='John'
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
                      Primer apellido
                    </FormLabel>
                    <FormControl>
                      <Input
                        type='text'
                        placeholder='Doe'
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
                      Segundo apellido
                    </FormLabel>
                    <FormControl>
                      <Input
                        type='text'
                        placeholder='Smith'
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
                      Correo electrónico
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
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button
                  onClick={() => {
                    setOpenCreateModal(false)
                  }}
                  className='btn mt-2 sm:mt-0'
                >
                  Cerrar
                </Button>
              </DialogClose>
              <Button
                type='submit'
                className='btn-quaternary'
              >
                Crear
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export { CreateModal }