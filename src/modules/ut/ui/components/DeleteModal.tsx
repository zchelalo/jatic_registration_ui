import { UtEntity } from '@/modules/ut/domain/entity'
import { UtUseCase } from '@/modules/ut/application/use_cases/ut'
import { AxiosRepository } from '@/modules/ut/infrastructure/repositories/axios'

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

const utRepository = new AxiosRepository()
const utUseCase = new UtUseCase(utRepository)

type DeleteModalProps = {
  openDeleteModal: boolean
  setOpenDeleteModal: (open: boolean) => void
  selectedUt: UtEntity
  setSelectedUt: (ut: UtEntity | null) => void
  meta: Meta
  getUts: (page: number, limit: number) => Promise<void>
}

function DeleteModal({
  openDeleteModal,
  setOpenDeleteModal,
  selectedUt,
  setSelectedUt,
  meta,
  getUts
}: DeleteModalProps) {
  const DeleteUtSchema = z.object({
    confirm: z
      .boolean()
  })

  type DeleteUtSchemaType = z.infer<typeof DeleteUtSchema>

  const form = useForm<DeleteUtSchemaType>({
    resolver: zodResolver(DeleteUtSchema),
    defaultValues: {
      confirm: false
    }
  })

  const onSubmit: SubmitHandler<DeleteUtSchemaType> = async (data) => {
    try {
      if (!data.confirm) {
        throw new Error('Por favor, confirma que deseas eliminar la universidad')
      }

      if (!selectedUt.id) {
        throw new Error('No hay universidad seleccionada')
      }

      await utUseCase.deleteUt(selectedUt.id)
      await getUts(meta.page, meta.perPage)

      setSelectedUt(null)
      setOpenDeleteModal(false)

      toast.success('Universidad eliminada exitosamente')
    } catch (error) {
      setSelectedUt(null)
      setOpenDeleteModal(false)

      console.error(error)

      if (error instanceof Error) {
        return toast.error(error.message)
      }

      toast.error('Un error ocurrió al eliminar la universidad')
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
                Eliminar universidad
              </DialogTitle>
              <DialogDescription>
                Una vez eliminado, la universidad tiene que ser reactivada manualmente
              </DialogDescription>
            </DialogHeader>

            <div className='flex flex-col my-6 space-y-4'>
              <FormField
                control={form.control}
                name='confirm'
                render={({ field }) => (
                  <FormItem className='w-full flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
                    <FormLabel>
                      ¿Estas seguro de que deseas eliminar la universidad?
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
                    setSelectedUt(null)
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