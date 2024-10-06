import { StudentEntity } from '@/modules/student/domain/entity'
import { StudentUseCase } from '@/modules/student/application/use_cases/student'
import { AxiosRepository } from '@/modules/student/infrastructure/repositories/axios'

import { Meta } from '@/types/meta'

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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Checkbox } from '@/components/ui/checkbox'

const studentRepository = new AxiosRepository()
const studentUseCase = new StudentUseCase(studentRepository)

type DeleteModalProps = {
  openDeleteModal: boolean
  setOpenDeleteModal: (open: boolean) => void
  selectedStudent: StudentEntity
  setSelectedStudent: (student: StudentEntity | null) => void
  meta: Meta
  getStudents: (page: number, limit: number) => Promise<void>
}

function DeleteModal({
  openDeleteModal,
  setOpenDeleteModal,
  selectedStudent,
  setSelectedStudent,
  meta,
  getStudents
}: DeleteModalProps) {
  const DeleteStudentSchema = z.object({
    confirm: z
      .boolean()
  })

  type DeleteStudentSchemaType = z.infer<typeof DeleteStudentSchema>

  const form = useForm<DeleteStudentSchemaType>({
    resolver: zodResolver(DeleteStudentSchema),
    defaultValues: {
      confirm: false
    }
  })

  const onSubmit: SubmitHandler<DeleteStudentSchemaType> = async (data) => {
    try {
      if (!data.confirm) {
        throw new Error('Por favor, confirma que deseas eliminar al estudiante')
      }

      if (!selectedStudent.id) {
        throw new Error('No hay estudiante seleccionado')
      }

      await studentUseCase.deleteStudent(selectedStudent.id)
      await getStudents(meta.page, meta.perPage)

      setSelectedStudent(null)
      setOpenDeleteModal(false)

      toast.success('Estudiante eliminado exitosamente')
    } catch (error) {
      setSelectedStudent(null)
      setOpenDeleteModal(false)

      console.error(error)

      if (error instanceof Error) {
        return toast.error(error.message)
      }

      toast.error('Un error ocurrió al eliminar al estudiante')
    }
  }

  return (
    <Dialog
      open={openDeleteModal}
    >
      <DialogContent className='back w-10/12 sm:w-full max-h-[80vh] overflow-y-auto rounded'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <DialogHeader>
              <DialogTitle>
                Eliminar estudiante
              </DialogTitle>
              <DialogDescription>
                Una vez eliminado, el estudiante tiene que ser reactivado manualmente
              </DialogDescription>
            </DialogHeader>

            <div className='flex flex-col my-6 space-y-4'>
              <FormField
                control={form.control}
                name='confirm'
                render={({ field }) => (
                  <FormItem className='w-full flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
                    <FormLabel>
                      ¿Estas seguro de que deseas eliminar al estudiante?
                    </FormLabel>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
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
                    setOpenDeleteModal(false)
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
                Eliminar
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export { DeleteModal }