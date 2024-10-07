import { StudentEntity } from '@/modules/student/domain/entity'
import { UtEntity } from '@/modules/ut/domain/entity'
import { CareerEntity } from '@/modules/career/domain/entity'
import { StudentUseCase } from '@/modules/student/application/use_cases/student'
import { AxiosRepository } from '@/modules/student/infrastructure/repositories/axios'

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const studentRepository = new AxiosRepository()
const studentUseCase = new StudentUseCase(studentRepository)

type CreateModalProps = {
  openCreateModal: boolean
  setOpenCreateModal: (open: boolean) => void
  students: StudentEntity[]
  setStudents: (students: StudentEntity[]) => void
  uts: UtEntity[]
  careers: CareerEntity[]
}

function CreateModal({
  openCreateModal,
  setOpenCreateModal,
  students,
  setStudents,
  uts,
  careers
}: CreateModalProps) {
  const CreateStudentSchema = z.object({
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

  type CreateStudentSchemaType = z.infer<typeof CreateStudentSchema>

  const form = useForm<CreateStudentSchemaType>({
    resolver: zodResolver(CreateStudentSchema),
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

  const onSubmit: SubmitHandler<CreateStudentSchemaType> = async (data) => {
    try {
      const lastName2 = data.lastName2 === '' ? undefined : data.lastName2

      const newStudent = await studentUseCase.createStudent(
        data.registrationNumber,
        data.name,
        data.lastName1,
        data.email,
        data.password,
        data.utID,
        data.careerID,
        lastName2
      )

      let newStudents 
      if (students.length >= 10) {
        newStudents = [newStudent.data, ...students.slice(0, 9)]
      } else {
        newStudents = [newStudent.data, ...students]
      }

      setStudents(newStudents)
      setOpenCreateModal(false)
      form.reset()

      toast.success('Estudiante creado exitosamente')
    } catch (error) {
      setOpenCreateModal(false)
      form.reset()

      console.error(error)
      toast.error('Un error ocurrió al intentar crear el estudiante')
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
                Crear estudiante
              </DialogTitle>
              <DialogDescription>
                Una vez creado el estudiante, podrá iniciar sesión con el correo electrónico y la contraseña que se le asignen
              </DialogDescription>
            </DialogHeader>

            <div className='flex flex-col my-6 space-y-4'>
              <FormField
                control={form.control}
                name='registrationNumber'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>
                      Matrícula
                    </FormLabel>
                    <FormControl>
                      <Input
                        type='text'
                        placeholder='21306066'
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
                      Confirmar matrícula
                    </FormLabel>
                    <FormControl>
                      <Input
                        type='text'
                        placeholder='21306066'
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
              <FormField
                control={form.control}
                name='confirmPassword'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>
                      Confirmar contraseña
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
                        <SelectTrigger className='w-full back text p-2 rounded'>
                          <SelectValue placeholder={'Universidad Tecnológica'} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {uts.map(ut => (
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
                        <SelectTrigger className='w-full back text p-2 rounded'>
                          <SelectValue placeholder={'Carrera Universitaria'} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {careers.map(career => (
                          <SelectItem key={career.id} value={career.id}>{career.key}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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