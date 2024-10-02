import { DateEntity } from '@/modules/date/domain/entity'
import { ClassEntity } from '@/modules/class/domain/entity'
import { EnrollmentEntity } from '@/modules/enrollment/domain/entity'

import { DateUseCase } from '@/modules/date/application/use_cases/date'
import { ClassUseCase } from '@/modules/class/application/use_cases/class'
import { EnrollmentUseCase } from '@/modules/enrollment/application/use_cases/enrollment'

import { AxiosRepository as DateRepository } from '@/modules/date/infrastructure/repositories/axios'
import { AxiosRepository as ClassRepository } from '@/modules/class/infrastructure/repositories/axios'
import { AxiosRepository as EnrollmentRepository } from '@/modules/enrollment/infrastructure/repositories/axios'

import { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/auth/useAuth'

import { Stepper } from '@/modules/home/ui/components/Stepper'
import { Enrollments } from '@/modules/enrollment/ui/Enrollments'

const dateRepository = new DateRepository()
const dateUseCase = new DateUseCase(dateRepository)

const classRepository = new ClassRepository()
const classUseCase = new ClassUseCase(classRepository)

const enrollmentReepository = new EnrollmentRepository()
const enrollmentUseCase = new EnrollmentUseCase(enrollmentReepository)

function Home() {
  const auth = useAuth()

  const [classes, setClasses] = useState<ClassEntity[]>()
  const [dates, setDates] = useState<DateEntity[]>()

  const [enrollments, setEnrollments] = useState<EnrollmentEntity[]>()

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

  useEffect(() => {
    (async () => {
      if (!auth.alreadySuscribedToClasses) {
        return
      }

      const { data: enrollmentsData } = await enrollmentUseCase.listEnrollments(1, 100)
      setEnrollments(enrollmentsData)
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

      {auth.alreadySuscribedToClasses && enrollments ? (
        <div className='h-full w-full flex p-4 sm:p-6'>
          <Enrollments
            enrollments={enrollments}
          />
        </div>
      ) : undefined}
    </div>
  )
}

export { Home }