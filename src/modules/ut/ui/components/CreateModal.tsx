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

type CreateModalProps = {
  openCreateModal: boolean
  setOpenCreateModal: (open: boolean) => void
  uts: UtEntity[]
  setUts: (uts: UtEntity[]) => void
}

function CreateModal({
  openCreateModal,
  setOpenCreateModal,
  uts,
  setUts,
}: CreateModalProps) {
  const CreateUtSchema = z.object({
    key: z
      .string()
      .min(1, { message: 'El nombre debe ser valido' })
      .max(255, { message: 'El nombre debe ser menor a 255 caracteres' })
  })

  type CreateUtSchemaType = z.infer<typeof CreateUtSchema>

  const form = useForm<CreateUtSchemaType>({
    resolver: zodResolver(CreateUtSchema),
    defaultValues: {
      key: ''
    }
  })

  const onSubmit: SubmitHandler<CreateUtSchemaType> = async (data) => {
    try {
      const newUt = await utUseCase.createUt(data.key)

      let newUts
      if (uts.length >= 10) {
        newUts = [newUt.data, ...uts.slice(0, 9)]
      } else {
        newUts = [newUt.data, ...uts]
      }

      setUts(newUts)
      setOpenCreateModal(false)
      form.reset()

      toast.success('Universidad creada exitosamente')
    } catch (error) {
      setOpenCreateModal(false)
      form.reset()

      console.error(error)
      toast.error('Un error ocurrió al intentar crear la universidad')
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
                Una vez creada la universidad, los estudiantes podrán registrarse con ella
              </DialogDescription>
            </DialogHeader>

            <div className='flex flex-col my-6 space-y-4'>
              <FormField
                control={form.control}
                name='key'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>
                      Nombre
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