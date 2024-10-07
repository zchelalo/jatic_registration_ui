import { DateType } from '@/types/date'

import { toast } from 'sonner'
import moment from 'moment'
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

type AddDateProps = {
  openAddModal: boolean
  setOpenAddModal: (open: boolean) => void
  dates: DateType[]
  setDates: (dates: DateType[]) => void
}

function AddDate({
  openAddModal,
  setOpenAddModal,
  dates,
  setDates
}: AddDateProps) {
  const AddDateSchema = z.object({
    day: z
      .string()
      .min(1, { message: 'El día debe ser valido' }),

    startTime: z
      .string()
      .min(1, { message: 'La fecha de inicio debe ser valido' }),

    endTime: z
      .string()
      .min(1, { message: 'La fecha de fin debe ser valido' })
  })

  type AddDateSchemaType = z.infer<typeof AddDateSchema>

  const form = useForm<AddDateSchemaType>({
    resolver: zodResolver(AddDateSchema),
    defaultValues: {
      day: '',
      startTime: '',
      endTime: ''
    }
  })

  const onSubmit: SubmitHandler<AddDateSchemaType> = async (data) => {
    try {
      if (!moment(data.day, 'YYYY-MM-DD', true).isValid()) {
        throw new Error('La fecha es invalida')
      }

      if (!moment(data.startTime, 'HH:mm', true).isValid()) {
        throw new Error('La hora de inicio es invalida')
      }

      if (!moment(data.endTime, 'HH:mm', true).isValid()) {
        throw new Error('La hora de fin es invalida')
      }

      if (moment(data.startTime, 'HH:mm').isAfter(moment(data.endTime, 'HH:mm'))) {
        throw new Error('La hora de inicio no puede ser mayor a la hora de fin')
      }

      setDates([...dates, data])
      setOpenAddModal(false)
      form.reset()

      toast.success('Fecha agregada correctamente')
    } catch (error) {
      setOpenAddModal(false)
      form.reset()

      console.error(error)
      if (error instanceof Error) {
        return toast.error(error.message)
      }
      toast.error('Un error ocurrió al intentar agregar la fecha')
    }
  }

  return (
    <Dialog
      open={openAddModal}
    >
      <DialogContent className='back w-10/12 sm:w-full max-h-[80vh] overflow-y-auto rounded'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <DialogHeader>
              <DialogTitle>
                Agregar fecha
              </DialogTitle>
              <DialogDescription>
                Las fechas pueden ser eliminadas o agregadas en cualquier momento
              </DialogDescription>
            </DialogHeader>

            <div className='flex flex-col my-6 space-y-4'>
              <FormField
                control={form.control}
                name='day'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>
                      Día
                    </FormLabel>
                    <FormControl>
                      <Input
                        aria-label='Date'
                        type='date'
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
                name='startTime'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>
                      Hora de inicio
                    </FormLabel>
                    <FormControl>
                      <Input
                        aria-label='Time'
                        type='time'
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
                name='endTime'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>
                      Hora de finalización
                    </FormLabel>
                    <FormControl>
                      <Input
                        aria-label='Time'
                        type='time'
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
                    setOpenAddModal(false)
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
                Agregar
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export { AddDate }