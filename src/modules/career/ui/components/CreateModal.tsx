import { CareerEntity } from '@/modules/career/domain/entity'
import { CareerUseCase } from '@/modules/career/application/use_cases/career'
import { AxiosRepository } from '@/modules/career/infrastructure/repositories/axios'

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

const careerRepository = new AxiosRepository()
const careerUseCase = new CareerUseCase(careerRepository)

type CreateModalProps = {
  openCreateModal: boolean
  setOpenCreateModal: (open: boolean) => void
  careers: CareerEntity[]
  setCareers: (careers: CareerEntity[]) => void
}

function CreateModal({
  openCreateModal,
  setOpenCreateModal,
  careers,
  setCareers,
}: CreateModalProps) {
  const CreateCareerSchema = z.object({
    key: z
      .string()
      .min(1, { message: 'El nombre debe ser valido' })
      .max(255, { message: 'El nombre debe ser menor a 255 caracteres' })
  })

  type CreateCareerSchemaType = z.infer<typeof CreateCareerSchema>

  const form = useForm<CreateCareerSchemaType>({
    resolver: zodResolver(CreateCareerSchema),
    defaultValues: {
      key: ''
    }
  })

  const onSubmit: SubmitHandler<CreateCareerSchemaType> = async (data) => {
    try {
      const newCareer = await careerUseCase.createCareer(data.key)

      let newCareers
      if (careers.length >= 10) {
        newCareers = [newCareer.data, ...careers.slice(0, 9)]
      } else {
        newCareers = [newCareer.data, ...careers]
      }

      setCareers(newCareers)
      setOpenCreateModal(false)
      form.reset()

      toast.success('Carrera creada exitosamente')
    } catch (error) {
      setOpenCreateModal(false)
      form.reset()

      console.error(error)
      toast.error('Un error ocurrió al intentar crear la carrera')
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
                Una vez creada la carrera, los estudiantes podrán registrarse con ella
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
                        placeholder='Carrera Tecnológica de Nogales'
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