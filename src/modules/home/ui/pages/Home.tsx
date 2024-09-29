import { DateEntity } from '@/modules/date/domain/entity'
import { ClassEntity } from '@/modules/class/domain/entity'

import { DateUseCase } from '@/modules/date/application/use_cases/date'
import { ClassUseCase } from '@/modules/class/application/use_cases/class'

import { AxiosRepository as DateRepository } from '@/modules/date/infrastructure/repositories/axios'
import { AxiosRepository as ClassRepository } from '@/modules/class/infrastructure/repositories/axios'

import { useEffect, useState } from 'react'

import { Stepper } from '@/modules/home/ui/components/Stepper'

const dateRepository = new DateRepository()
const dateUseCase = new DateUseCase(dateRepository)

const classRepository = new ClassRepository()
const classUseCase = new ClassUseCase(classRepository)

function Home() {
  const [classes, setClasses] = useState<ClassEntity[]>()
  const [dates, setDates] = useState<DateEntity[]>()

  useEffect(() => {
    (async () => {
      const { data: datesData } = await dateUseCase.listDates(1, 100)
      setDates(datesData)

      const { data: classesData } = await classUseCase.listClasses(1, 100)
      setClasses(classesData)
    })()
  }, [])

  return (
    <div className='h-full w-full flex justify-center p-4 sm:p-6'>
      {classes && dates ?
        <Stepper
          classes={classes}
          dates={dates}
        />
      : undefined}
    </div>
  )
}

export { Home }