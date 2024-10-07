import { CareerEntity } from '@/modules/career/domain/entity'
import { CareerUseCase } from '@/modules/career/application/use_cases/career'
import { AxiosRepository } from '@/modules/career/infrastructure/repositories/axios'

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

const careerRepository = new AxiosRepository()
const careerUseCase = new CareerUseCase(careerRepository)

type DeleteModalProps = {
  openDeleteModal: boolean
  setOpenDeleteModal: (open: boolean) => void
  selectedCareer: CareerEntity
  setSelectedCareer: (career: CareerEntity | null) => void
  meta: Meta
  getCareers: (page: number, limit: number) => Promise<void>
}

function DeleteModal({
  openDeleteModal,
  setOpenDeleteModal,
  selectedCareer,
  setSelectedCareer,
  meta,
  getCareers
}: DeleteModalProps) {
  const DeleteCareerSchema = z.object({
    confirm: z
      .boolean()
  })

  type DeleteCareerSchemaType = z.infer<typeof DeleteCareerSchema>

  const form = useForm<DeleteCareerSchemaType>({
    resolver: zodResolver(DeleteCareerSchema),
    defaultValues: {
      confirm: false
    }
  })

  const onSubmit: SubmitHandler<DeleteCareerSchemaType> = async (data) => {
    try {
      if (!data.confirm) {
        throw new Error('Por favor, confirma que deseas eliminar la carrera')
      }

      if (!selectedCareer.id) {
        throw new Error('No hay carrera seleccionada')
      }

      await careerUseCase.deleteCareer(selectedCareer.id)
      await getCareers(meta.page, meta.perPage)

      setSelectedCareer(null)
      setOpenDeleteModal(false)

      toast.success('Carrera eliminada exitosamente')
    } catch (error) {
      setSelectedCareer(null)
      setOpenDeleteModal(false)

      console.error(error)

      if (error instanceof Error) {
        return toast.error(error.message)
      }

      toast.error('Un error ocurrió al eliminar la carrera')
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
                Eliminar carrera
              </DialogTitle>
              <DialogDescription>
                Una vez eliminado, la carrera tiene que ser reactivada manualmente
              </DialogDescription>
            </DialogHeader>

            <div className='flex flex-col my-6 space-y-4'>
              <FormField
                control={form.control}
                name='confirm'
                render={({ field }) => (
                  <FormItem className='w-full flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
                    <FormLabel>
                      ¿Estas seguro de que deseas eliminar la carrera?
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
                    setSelectedCareer(null)
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