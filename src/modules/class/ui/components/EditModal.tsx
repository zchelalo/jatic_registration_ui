import { ClassEntity } from '@/modules/class/domain/entity'
import { TeacherEntity } from '@/modules/teacher/domain/entity'
import { ClassUseCase } from '@/modules/class/application/use_cases/class'
import { AxiosRepository } from '@/modules/class/infrastructure/repositories/axios'

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
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const classRepository = new AxiosRepository()
const classUseCase = new ClassUseCase(classRepository)

type EditModalProps = {
  openEditModal: boolean
  setOpenEditModal: (open: boolean) => void
  selectedClass: ClassEntity
  setSelectedClass: (classObtained: ClassEntity | null) => void
  classes: ClassEntity[]
  setClasses: (classes: ClassEntity[]) => void
  teachers: TeacherEntity[]
}

function EditModal({
  openEditModal,
  setOpenEditModal,
  selectedClass,
  setSelectedClass,
  classes,
  setClasses,
  teachers
}: EditModalProps) {
  const EditClassSchema = z.object({
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

  type EditClassSchemaType = z.infer<typeof EditClassSchema>

  const form = useForm<EditClassSchemaType>({
    resolver: zodResolver(EditClassSchema),
    values: {
      name: selectedClass.name,
      description: selectedClass.description,
      teacherId: selectedClass.teacher.id as string
    }
  })

  const onSubmit: SubmitHandler<EditClassSchemaType> = async (data) => {
    try {
      if (!selectedClass.id) {
        throw new Error('No se ha seleccionado una taller')
      }
      await classUseCase.updateClass(selectedClass.id, data.name, data.description, data.teacherId)

      const classIndex = classes.findIndex(classObtained => classObtained.id === selectedClass.id)
      const teacherIndex = teachers.findIndex(teacher => teacher.id === data.teacherId)
      classes[classIndex] = {
        ...classes[classIndex],
        name: data.name,
        description: data.description,
        teacher: teachers[teacherIndex]
      }
      setClasses([...classes])

      setSelectedClass(null)
      setOpenEditModal(false)

      toast.success('Taller actualizado exitosamente')
    } catch (error) {
      setSelectedClass(null)
      setOpenEditModal(false)

      console.error(error)
      toast.error('Un error ocurrió al intentar actualizar el taller')
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
                Editar taller
              </DialogTitle>
              <DialogDescription>
                Una vez que edites el taller, los cambios serán permanentes
              </DialogDescription>
            </DialogHeader>

            <div className='flex flex-col my-6 space-y-4'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>
                      Nombre de la taller
                    </FormLabel>
                    <FormControl>
                      <Input
                        type='text'
                        placeholder='Taller Tecnológica de Nogales'
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
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button
                  onClick={() => {
                    setSelectedClass(null)
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