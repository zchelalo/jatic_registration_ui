import { ClassEntity } from '@/modules/class/domain/entity'
import { TeacherEntity } from '@/modules/teacher/domain/entity'
import { ClassUseCase } from '@/modules/class/application/use_cases/class'
import { AxiosRepository } from '@/modules/class/infrastructure/repositories/axios'

import { DateType } from '@/types/date'

import { toast } from 'sonner'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { SubmitHandler, useForm } from 'react-hook-form'
import { useState } from 'react'

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
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'
import { AddDate } from '@/modules/class/ui/components/AddDate'
import moment from 'moment'

const classRepository = new AxiosRepository()
const classUseCase = new ClassUseCase(classRepository)

type CreateModalProps = {
  openCreateModal: boolean
  setOpenCreateModal: (open: boolean) => void
  classes: ClassEntity[]
  setClasses: (classes: ClassEntity[]) => void
  teachers: TeacherEntity[]
}

function CreateModal({
  openCreateModal,
  setOpenCreateModal,
  classes,
  setClasses,
  teachers
}: CreateModalProps) {
  const [openAddModal, setOpenAddModal] = useState(false)
  const [dates, setDates] = useState<DateType[]>([])

  const CreateClassSchema = z.object({
    name: z
      .string()
      .min(1, { message: 'El nombre debe ser valido' }),

    description: z
      .string()
      .min(1, { message: 'La descripción debe ser valida' }),

    teacherId: z
      .string()
      .uuid({ message: 'El id del profesor debe ser valido' })
  })

  type CreateClassSchemaType = z.infer<typeof CreateClassSchema>

  const form = useForm<CreateClassSchemaType>({
    resolver: zodResolver(CreateClassSchema),
    defaultValues: {
      name: '',
      description: '',
      teacherId: ''
    }
  })

  const onSubmit: SubmitHandler<CreateClassSchemaType> = async (data) => {
    try {
      if (dates.length === 0) {
        throw new Error('Debe agregar al menos una fecha')
      }

      const newClass = await classUseCase.createClass(
        data.name,
        data.description,
        data.teacherId,
        dates
      )

      let newClasses
      if (classes.length >= 10) {
        newClasses = [newClass.data, ...classes.slice(0, 9)]
      } else {
        newClasses = [newClass.data, ...classes]
      }

      setClasses(newClasses)
      setOpenCreateModal(false)
      setDates([])
      form.reset()

      toast.success('Taller creada exitosamente')
    } catch (error) {
      setDates([])
      setOpenCreateModal(false)
      form.reset()

      console.error(error)
      if (error instanceof Error) {
        return toast.error(error.message)
      }
      toast.error('Un error ocurrió al intentar crear la taller')
    }
  }

  return (
    <>
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
                  Crear taller
                </DialogTitle>
                <DialogDescription>
                  Una vez creado el taller, los estudiantes podrán registrarse en el
                </DialogDescription>
              </DialogHeader>
  
              <div className='flex flex-col my-6 space-y-4'>
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem className='w-full'>
                      <FormLabel>
                        Nombre
                      </FormLabel>
                      <FormControl>
                        <Input
                          type='text'
                          placeholder='AWS para principiantes'
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
                  name='description'
                  render={({ field }) => (
                    <FormItem className='w-full'>
                      <FormLabel>
                        Descripción
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder='Aprende a usar AWS desde cero'
                          className='resize-none w-full back text'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='teacherId'
                  render={({ field }) => (
                    <FormItem className='w-full'>
                      <FormLabel>Tallerista</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className='w-full back text p-2 rounded'>
                            <SelectValue placeholder={'John Doe'} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {teachers.map(teacher => (
                            <SelectItem key={teacher.id} value={teacher.id as string}>{teacher.user.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className='w-full flex flex-col'>
                  <div className='mb-3'>
                    <FormLabel className='w-full mr-3'>Fechas</FormLabel>
                    <Button
                      type='button'
                      className='btn-quaternary'
                      onClick={() => {
                        setOpenAddModal(true)
                      }}
                    >
                      Agregar fecha
                    </Button>
                  </div>
                  <div className='w-full flex flex-wrap items-center justify-start'>
                    {dates?.map((date, index) => (
                      <Card
                        key={index}
                        className='back-secondary flex justify-center items-center'
                      >
                        <CardContent className='p-2 m-0'>
                          <p>{moment(date.day).format('DD-MM-YYYY')} | {moment(date.startTime, 'HH:mm', true).format('HH:mm')} - {moment(date.endTime, 'HH:mm', true).format('HH:mm')}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
  
              <DialogFooter>
                <DialogClose asChild>
                  <Button
                    onClick={() => {
                      setOpenCreateModal(false)
                      setDates([])
                      form.reset()
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
      <AddDate
        openAddModal={openAddModal}
        setOpenAddModal={setOpenAddModal}
        dates={dates}
        setDates={setDates}
      />
    </>
  )
}

export { CreateModal }