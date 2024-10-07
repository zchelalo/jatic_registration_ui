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

type EditModalProps = {
  openEditModal: boolean
  setOpenEditModal: (open: boolean) => void
  selectedCareer: CareerEntity
  setSelectedCareer: (career: CareerEntity | null) => void
  careers: CareerEntity[]
  setCareers: (careers: CareerEntity[]) => void
}

function EditModal({
  openEditModal,
  setOpenEditModal,
  selectedCareer,
  setSelectedCareer,
  careers,
  setCareers
}: EditModalProps) {
  const EditCareerSchema = z.object({
    key: z
      .string()
      .min(1, { message: 'El nombre debe ser valido' })
      .max(255, { message: 'El nombre debe ser menor a 255 caracteres' })
  })

  type EditCareerSchemaType = z.infer<typeof EditCareerSchema>

  const form = useForm<EditCareerSchemaType>({
    resolver: zodResolver(EditCareerSchema),
    values: {
      key: selectedCareer.key
    }
  })

  const onSubmit: SubmitHandler<EditCareerSchemaType> = async (data) => {
    try {
      if (!selectedCareer.id) {
        throw new Error('No se ha seleccionado una carrera')
      }
      await careerUseCase.updateCareer(selectedCareer.id, data.key)

      const careerIndex = careers.findIndex(career => career.id === selectedCareer.id)
      careers[careerIndex] = {
        ...careers[careerIndex],
        key: data.key
      }
      setCareers([...careers])

      setSelectedCareer(null)
      setOpenEditModal(false)

      toast.success('Carrera actualizada exitosamente')
    } catch (error) {
      setSelectedCareer(null)
      setOpenEditModal(false)

      console.error(error)
      toast.error('Un error ocurrió al intentar actualizar la carrera')
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
                Editar carrera
              </DialogTitle>
              <DialogDescription>
                Una vez que edites la carrera, los cambios serán permanentes
              </DialogDescription>
            </DialogHeader>

            <div className='flex flex-col my-6 space-y-4'>
              <FormField
                control={form.control}
                name='key'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>
                      Nombre de la carrera
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
                    setSelectedCareer(null)
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