import { ClassEntity } from '@/modules/class/domain/entity'
import { ClassUseCase } from '@/modules/class/application/use_cases/class'
import { AxiosRepository } from '@/modules/class/infrastructure/repositories/axios'

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

const classRepository = new AxiosRepository()
const classUseCase = new ClassUseCase(classRepository)

type DeleteModalProps = {
  openDeleteModal: boolean
  setOpenDeleteModal: (open: boolean) => void
  selectedClass: ClassEntity
  setSelectedClass: (selectedClass: ClassEntity | null) => void
  meta: Meta
  getClasses: (page: number, limit: number) => Promise<void>
}

function DeleteModal({
  openDeleteModal,
  setOpenDeleteModal,
  selectedClass,
  setSelectedClass,
  meta,
  getClasses
}: DeleteModalProps) {
  const DeleteClassSchema = z.object({
    confirm: z
      .boolean()
  })

  type DeleteClassSchemaType = z.infer<typeof DeleteClassSchema>

  const form = useForm<DeleteClassSchemaType>({
    resolver: zodResolver(DeleteClassSchema),
    defaultValues: {
      confirm: false
    }
  })

  const onSubmit: SubmitHandler<DeleteClassSchemaType> = async (data) => {
    try {
      if (!data.confirm) {
        throw new Error('Por favor, confirma que deseas eliminar la taller')
      }

      if (!selectedClass.id) {
        throw new Error('No hay taller seleccionada')
      }

      await classUseCase.deleteClass(selectedClass.id)
      await getClasses(meta.page, meta.perPage)

      setSelectedClass(null)
      setOpenDeleteModal(false)

      toast.success('Taller eliminada exitosamente')
    } catch (error) {
      setSelectedClass(null)
      setOpenDeleteModal(false)

      console.error(error)

      if (error instanceof Error) {
        return toast.error(error.message)
      }

      toast.error('Un error ocurrió al eliminar la taller')
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
                Eliminar taller
              </DialogTitle>
              <DialogDescription>
                Una vez eliminado, el taller tiene que ser reactivada manualmente
              </DialogDescription>
            </DialogHeader>

            <div className='flex flex-col my-6 space-y-4'>
              <FormField
                control={form.control}
                name='confirm'
                render={({ field }) => (
                  <FormItem className='w-full flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
                    <FormLabel>
                      ¿Estas seguro de que deseas eliminar el taller?
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
                    setSelectedClass(null)
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