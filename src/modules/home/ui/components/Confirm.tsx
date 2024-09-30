import { AxiosRepository } from '@/modules/class/infrastructure/repositories/axios'
import { ClassUseCase } from '@/modules/class/application/use_cases/class'

import { SelectedClassType } from '@/modules/home/ui/components/Stepper'

import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Fragment, useState, useEffect } from 'react'

const classRepository = new AxiosRepository()
const classUseCase = new ClassUseCase(classRepository)

type ConfirmProps = {
  selectedClasses: SelectedClassType[]
}

function Confirm({
  selectedClasses
}: ConfirmProps) {
  const [filteredClasses, setFilteredClasses] = useState<SelectedClassType[]>([])

  useEffect(() => {
    const classes = selectedClasses
      .reduce((acc: SelectedClassType[], classObtained: SelectedClassType) => {
        if (!acc.some(selectedClass => selectedClass.class.id === classObtained.class.id)) {
          acc.push(classObtained)
        }

        return acc
      }, [])

    setFilteredClasses(classes)
  }, [filteredClasses, selectedClasses])

  const handleConfirm = async (selectedClasses: SelectedClassType[]) => {
    const classIds = selectedClasses
      .map(selectedClass => selectedClass.class.id)
      .reduce((acc: string[], classId: string) => {
        if (!acc.includes(classId)) {
          acc.push(classId)
        }

        return acc
      }, [])

    try {
      await classUseCase.suscribeClass(classIds)
      toast.success('Suscripción a los talleres exitosa')
    } catch (error) {
      console.log(error)
      toast.error('Error al suscribirse a los talleres')
    }
  }

  return (
    <ScrollArea className='w-full flex flex-col justify-center items-center text text-center'>
      <h1 className='text-xl sm:text-2xl font-semibold mb-2'>
        Resumen
      </h1>
      {filteredClasses.map(selectedClass => (
        <Fragment key={selectedClass.date.id}>
          <div className='w-full grid grid-cols-2 text-left mb-4'>
            <h2 className='col-span-2 text-lg sm:text-xl font-medium p-1'>
              {selectedClass.class.name}
            </h2>
            <div className='p-1'>
              <h3 className='text-base sm:text-lg'>
                Descripción
              </h3>
              <p className='text-pretty text-sm'>
                {selectedClass.class.description}
              </p>
            </div>
            <div className='p-1'>
              <h3 className='text-base sm:text-lg'>
                Tallerista
              </h3>
              <p className='text-pretty text-sm'>
                {selectedClass.class.teacher.user.name} {selectedClass.class.teacher.user.lastName1} {selectedClass.class.teacher.user.lastName2} 
              </p>
              <p className='text-pretty text-sm'>
                {selectedClass.class.teacher.profile}
              </p>
            </div>
          </div>
          <hr className='mb-4' />
        </Fragment>
      ))}
      <Button
        type='button'
        className='btn w-full mt-2 mb-4'
        onClick={() => handleConfirm(selectedClasses)}
      >
        Confirmar selección
      </Button>
    </ScrollArea>
  )
}

export { Confirm }