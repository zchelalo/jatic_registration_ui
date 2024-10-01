import { DateEntity } from '@/modules/date/domain/entity'
import { ClassEntity } from '@/modules/class/domain/entity'

import { DateUseCase } from '@/modules/date/application/use_cases/date'
import { ClassUseCase } from '@/modules/class/application/use_cases/class'

import { AxiosRepository as DateRepository } from '@/modules/date/infrastructure/repositories/axios'
import { AxiosRepository as ClassRepository } from '@/modules/class/infrastructure/repositories/axios'

import { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/auth/useAuth'

import { Stepper } from '@/modules/home/ui/components/Stepper'

const dateRepository = new DateRepository()
const dateUseCase = new DateUseCase(dateRepository)

const classRepository = new ClassRepository()
const classUseCase = new ClassUseCase(classRepository)

function Home() {
  const auth = useAuth()

  const [classes, setClasses] = useState<ClassEntity[]>()
  const [dates, setDates] = useState<DateEntity[]>()

  useEffect(() => {
    (async () => {
      if (auth.alreadySuscribedToClasses) {
        return
      }

      const { data: datesData } = await dateUseCase.listDates(1, 100)
      setDates(datesData)

      const { data: classesData } = await classUseCase.listClasses(1, 100)
      setClasses(classesData)
    })()
  }, [])

  return (
    <div className='h-full w-full flex justify-center p-4 sm:p-6'>
      {(!auth.alreadySuscribedToClasses && classes && dates) ? (
        <Stepper
          classes={classes}
          dates={dates}
        />
      ) : undefined}

      {auth.alreadySuscribedToClasses ? (
        <div className='flex flex-col items-center justify-center'>
          <h1 className='text-2xl sm:text-3xl font-bold text-center'>
            You are already subscribed to classes
          </h1>
        </div>
      ) : undefined}
    </div>
  )
}

export { Home }