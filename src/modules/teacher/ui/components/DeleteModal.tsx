import { TeacherEntity } from '@/modules/teacher/domain/entity'
import { TeacherUseCase } from '@/modules/teacher/application/use_cases/teacher'
import { AxiosRepository } from '@/modules/teacher/infrastructure/repositories/axios'

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

const teacherRepository = new AxiosRepository()
const teacherUseCase = new TeacherUseCase(teacherRepository)

type DeleteModalProps = {
  openDeleteModal: boolean
  setOpenDeleteModal: (open: boolean) => void
  selectedTeacher: TeacherEntity
  setSelectedTeacher: (teacher: TeacherEntity | null) => void
  meta: Meta
  getTeachers: (page: number, limit: number) => Promise<void>
}

function DeleteModal({
  openDeleteModal,
  setOpenDeleteModal,
  selectedTeacher,
  setSelectedTeacher,
  meta,
  getTeachers
}: DeleteModalProps) {
  const DeleteTeacherSchema = z.object({
    confirm: z
      .boolean()
  })

  type DeleteTeacherSchemaType = z.infer<typeof DeleteTeacherSchema>

  const form = useForm<DeleteTeacherSchemaType>({
    resolver: zodResolver(DeleteTeacherSchema),
    defaultValues: {
      confirm: false
    }
  })

  const onSubmit: SubmitHandler<DeleteTeacherSchemaType> = async (data) => {
    try {
      if (!data.confirm) {
        throw new Error('Por favor, confirma que deseas eliminar al tallerista')
      }

      if (!selectedTeacher.id) {
        throw new Error('No hay tallerista seleccionado')
      }

      await teacherUseCase.deleteTeacher(selectedTeacher.id)
      await getTeachers(meta.page, meta.perPage)

      setSelectedTeacher(null)
      setOpenDeleteModal(false)

      toast.success('Teacher deleted successfully')
    } catch (error) {
      setSelectedTeacher(null)
      setOpenDeleteModal(false)

      console.error(error)

      if (error instanceof Error) {
        return toast.error(error.message)
      }

      toast.error('Un error ocurrió al eliminar al tallerista')
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
                Eliminar tallerista
              </DialogTitle>
              <DialogDescription>
                Una vez eliminado, el tallerista tiene que ser reactivado manualmente
              </DialogDescription>
            </DialogHeader>

            <div className='flex flex-col my-6 space-y-4'>
              <FormField
                control={form.control}
                name='confirm'
                render={({ field }) => (
                  <FormItem className='w-full flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
                    <FormLabel>
                      ¿Estas seguro de que deseas eliminar al tallerista?
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
                    setSelectedTeacher(null)
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