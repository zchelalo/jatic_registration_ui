import { ClassEntity } from '@/modules/class/domain/entity'
import { DateEntity } from '@/modules/date/domain/entity'

import { SelectedClassType } from './Stepper'
import { toast } from 'sonner'
import moment from 'moment'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { ScrollArea } from '@/components/ui/scroll-area'

type StepProps = {
  date: DateEntity
  classesToShow: ClassEntity[]
  selectedClasses: SelectedClassType[]
  next: boolean
  onSubmit: (selectedClass: SelectedClassType) => void
}

function Step({
  date,
  classesToShow,
  selectedClasses,
  next,
  onSubmit: handleNext
}: StepProps) {
  useEffect(() => {
    if (!next) {
      return
    }

    const dateExists = selectedClasses.some(selectedClass => 
      selectedClass.class.dates.some(selectedDate => selectedDate.day === date.day)
    )

    if (dateExists) {
      const selectedClass = selectedClasses.find(selectedClass => selectedClass.class.dates.some(selectedDate => selectedDate.day === date.day)) 

      if (!selectedClass) {
        throw new Error('Selected class not found')
      }

      handleNext({
        date,
        class: selectedClass.class
      })
    }
  }, [selectedClasses, date, handleNext, next])

  const AddClassSchema = z.object({
    classID: z
      .string()
      .min(1, { message: 'Selecciona un taller' }),
  })

  type AddClassSchemaType = z.infer<typeof AddClassSchema>

  const form = useForm<AddClassSchemaType>({
    resolver: zodResolver(AddClassSchema),
    defaultValues: {
      classID: ''
    }
  })

  const onSubmit: SubmitHandler<AddClassSchemaType> = async (data) => {
    try {
      const classSelected = classesToShow.find(classToShow => classToShow.id === data.classID)
      if (!classSelected) {
        throw new Error('Class not found')
      }

      handleNext({
        date,
        class: classSelected
      })
    } catch (error) {
      console.error(error)
      toast.error('An error occurred while trying to sign up')
    }
  }

  return (
    <ScrollArea className='w-full'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='w-full h-full flex flex-col items-center justify-center space-y-6 pb-4 px-2'
        >
          <h2 className='text-xl font-medium pt-2'>
            Día {moment(date.day).utc(false).format('DD-MM-YYYY')} de JATIC
          </h2>
          <FormField
            control={form.control}
            name='classID'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Taller</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className='w-full bg text p-2 rounded'>
                      <SelectValue placeholder={`Taller del día ${moment(date.day).utc(false).format('DD-MM-YYYY')}`} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {classesToShow?.map(classToShow => (
                      <SelectItem key={classToShow.id} value={classToShow.id}>{classToShow.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type='submit'
            className='btn w-full'
          >
            Siguiente
          </Button>
        </form>
      </Form>
    </ScrollArea>
  )
}

export { Step }