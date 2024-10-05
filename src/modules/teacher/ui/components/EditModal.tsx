import { TeacherEntity } from '@/modules/teacher/domain/entity'
import { TeacherUseCase } from '@/modules/teacher/application/use_cases/teacher'
import { AxiosRepository } from '@/modules/teacher/infrastructure/repositories/axios'

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

const teacherRepository = new AxiosRepository()
const teacherUseCase = new TeacherUseCase(teacherRepository)

type EditModalProps = {
  openEditModal: boolean
  setOpenEditModal: (open: boolean) => void
  selectedTeacher: TeacherEntity
  setSelectedTeacher: (teacher: TeacherEntity | null) => void
}

function EditModal({
  openEditModal,
  setOpenEditModal,
  selectedTeacher,
  setSelectedTeacher
}: EditModalProps) {
  const EditTeacherSchema = z.object({
    profile: z
      .string()
      .min(3, { message: 'Profile must be at least 3 characters long' }),

    password: z
      .string()
      .refine(val => val === '' || val.length >= 8, {
        message: 'Password must be at least 8 characters long',
      }),
  })

  type EditTeacherSchemaType = z.infer<typeof EditTeacherSchema>

  const form = useForm<EditTeacherSchemaType>({
    resolver: zodResolver(EditTeacherSchema),
    values: {
      profile: selectedTeacher.profile,
      password: ''
    }
  })

  const onSubmit: SubmitHandler<EditTeacherSchemaType> = async (data) => {
    try {
      if (!selectedTeacher.id) {
        throw new Error('No teacher id')
      }
      let password = undefined
      if (data.password) {
        password = data.password
      }
      await teacherUseCase.updateTeacher(selectedTeacher.id, data.profile, password)

      setSelectedTeacher(null)
      setOpenEditModal(false)

      toast.success('Teacher updated successfully')
    } catch (error) {
      setSelectedTeacher(null)
      setOpenEditModal(false)

      console.error(error)
      toast.error('An error occurred while trying to update the teacher')
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
                Editar tallerista
              </DialogTitle>
              <DialogDescription>
                Una vez que edites al tallerista, los cambios serán permanentes
              </DialogDescription>
            </DialogHeader>

            <div className='flex flex-col my-6 space-y-4'>
              <FormField
                control={form.control}
                name='profile'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>
                      Perfil del tallerista
                    </FormLabel>
                    <FormControl>
                      <Input
                        type='text'
                        placeholder='Él es una persona muy habilidosa'
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
                name='password'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>
                      Contraseña
                    </FormLabel>
                    <FormControl>
                      <Input
                        type='password'
                        placeholder='securePassword123'
                        autoComplete='new-password'
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
                    setSelectedTeacher(null)
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