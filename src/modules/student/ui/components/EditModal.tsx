import { StudentEntity } from '@/modules/student/domain/entity'
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

const studentRepository = new AxiosRepository()
const studentUseCase = new StudentUseCase(studentRepository)

type EditModalProps = {
  openEditModal: boolean
  setOpenEditModal: (open: boolean) => void
  selectedStudent: StudentEntity
  setSelectedStudent: (student: StudentEntity | null) => void
  students: StudentEntity[]
  setStudents: (students: StudentEntity[]) => void
}

function EditModal({
  openEditModal,
  setOpenEditModal,
  selectedStudent,
  setSelectedStudent,
  students,
  setStudents
}: EditModalProps) {
  const EditStudentSchema = z.object({
    registrationNumber: z
      .string()
      .min(1, { message: 'La matrícula debe tener al menos un caracter' }),

    password: z
      .string()
      .refine(val => val === '' || val.length >= 8, {
        message: 'La contraseña debe tener al menos 8 caracteres',
      }),
  })

  type EditStudentSchemaType = z.infer<typeof EditStudentSchema>

  const form = useForm<EditStudentSchemaType>({
    resolver: zodResolver(EditStudentSchema),
    values: {
      registrationNumber: selectedStudent.registrationNumber,
      password: ''
    }
  })

  const onSubmit: SubmitHandler<EditStudentSchemaType> = async (data) => {
    try {
      if (!selectedStudent.id) {
        throw new Error('No se ha seleccionado un estudiante')
      }
      let password = undefined
      if (data.password) {
        password = data.password
      }
      await studentUseCase.updateStudent(selectedStudent.id, data.registrationNumber, password)

      const studentIndex = students.findIndex(student => student.id === selectedStudent.id)
      students[studentIndex] = {
        ...students[studentIndex],
        registrationNumber: data.registrationNumber
      }
      setStudents([...students])

      setSelectedStudent(null)
      setOpenEditModal(false)

      toast.success('Estudiante actualizado exitosamente')
    } catch (error) {
      setSelectedStudent(null)
      setOpenEditModal(false)

      console.error(error)
      toast.error('Un error ocurrió al intentar actualizar al estudiante')
    }
  }

  return (
    <Dialog
      open={openEditModal}
    >
      <DialogContent className='back w-10/12 sm:w-full max-h-[80vh] overflow-y-auto rounded'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <DialogHeader>
              <DialogTitle>
                Editar estudiante
              </DialogTitle>
              <DialogDescription>
                Una vez que edites al estudiante, los cambios serán permanentes
              </DialogDescription>
            </DialogHeader>

            <div className='flex flex-col my-6 space-y-4'>
              <FormField
                control={form.control}
                name='registrationNumber'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>
                      Matrícula del estudiante
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
                    setSelectedStudent(null)
                    setOpenEditModal(false)
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
                Editar
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export { EditModal }