import moment from 'moment'
import { EnrollmentEntity } from '../domain/entity'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

type EnrollmentsProps = {
  enrollments: EnrollmentEntity[]
}

function Enrollments({
  enrollments
}: EnrollmentsProps) {
  enrollments.map(enrollment => enrollment.class.dates.sort((a, b) => {
    if (moment(a.day).isBefore(moment(b.day))) {
      return -1
    }

    if (moment(a.day).isAfter(moment(b.day))) {
      return 1
    }

    return 0
  }))

  return (
    <main className='w-full text-pretty'>
      <h1 className='text-2xl font-semibold mb-3'>
        Talleres inscritos
      </h1>
      <section className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 space-y-3 sm:space-y-0 sm:space-x-3'>
        {enrollments.map(enrollment => (
          <Card
            key={enrollment.id}
            className='w-full back-secondary'
          >
            <CardHeader>
              <CardTitle>
                {enrollment.class.name}
              </CardTitle>
              <CardDescription>
                {enrollment.class.description}
              </CardDescription>
            </CardHeader>
            <CardContent className='text-pretty'>
              <h3 className='text-lg'>
                Tallerista
              </h3>
              <small>
                {enrollment.class.teacher.user.name} {enrollment.class.teacher.user.lastName1} {enrollment.class.teacher.user.lastName2}
              </small>
              <h3 className='text-lg mt-2'>
                Estado de inscripción
              </h3>
              <small>
                {enrollment.paidAt ? 'Pagado' : 'Pendiente de pago'}
              </small>
            </CardContent>
            <CardFooter className='text-pretty flex flex-col items-start'>
              <h3 className='text-lg'>
                Fechas
              </h3>
              <ul>
                {enrollment.class.dates.map(date => (
                  <li key={date.id}>
                    {moment(date.day).format('DD/MM/YYYY')} de {moment(date.startTime).format('HH:mm')} a {moment(date.endTime).format('HH:mm')}
                  </li>
                ))}
              </ul>
            </CardFooter>
          </Card>
        ))}
      </section>
    </main>
  )
}

export { Enrollments }