import { UtEntity } from '@/modules/ut/domain/entity'
import { UtUseCase } from '@/modules/ut/application/use_cases/ut'
import { AxiosRepository } from '@/modules/ut/infrastructure/repositories/axios'

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

const utRepository = new AxiosRepository()
const utUseCase = new UtUseCase(utRepository)

type EditModalProps = {
  openEditModal: boolean
  setOpenEditModal: (open: boolean) => void
  selectedUt: UtEntity
  setSelectedUt: (ut: UtEntity | null) => void
  uts: UtEntity[]
  setUts: (uts: UtEntity[]) => void
}

function EditModal({
  openEditModal,
  setOpenEditModal,
  selectedUt,
  setSelectedUt,
  uts,
  setUts
}: EditModalProps) {
  const EditUtSchema = z.object({
    key: z
      .string()
      .min(1, { message: 'El nombre debe ser valido' })
      .max(255, { message: 'El nombre debe ser menor a 255 caracteres' })
  })

  type EditUtSchemaType = z.infer<typeof EditUtSchema>

  const form = useForm<EditUtSchemaType>({
    resolver: zodResolver(EditUtSchema),
    values: {
      key: selectedUt.key
    }
  })

  const onSubmit: SubmitHandler<EditUtSchemaType> = async (data) => {
    try {
      if (!selectedUt.id) {
        throw new Error('No se ha seleccionado una universidad')
      }
      await utUseCase.updateUt(selectedUt.id, data.key)

      const utIndex = uts.findIndex(ut => ut.id === selectedUt.id)
      uts[utIndex] = {
        ...uts[utIndex],
        key: data.key
      }
      setUts([...uts])

      setSelectedUt(null)
      setOpenEditModal(false)

      toast.success('Universidad actualizada exitosamente')
    } catch (error) {
      setSelectedUt(null)
      setOpenEditModal(false)

      console.error(error)
      toast.error('Un error ocurrió al intentar actualizar la universidad')
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
                Editar universidad
              </DialogTitle>
              <DialogDescription>
                Una vez que edites la universidad, los cambios serán permanentes
              </DialogDescription>
            </DialogHeader>

            <div className='flex flex-col my-6 space-y-4'>
              <FormField
                control={form.control}
                name='key'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>
                      Nombre de la universidad
                    </FormLabel>
                    <FormControl>
                      <Input
                        type='text'
                        placeholder='Universidad Tecnológica de Nogales'
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
                    setSelectedUt(null)
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