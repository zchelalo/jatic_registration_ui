import { DateEntity } from '@/modules/date/domain/entity'
import { DateUseCase } from '@/modules/date/application/use_cases/date'
import { AxiosRepository } from '@/modules/date/infrastructure/repositories/axios'

import { useEffect, useState } from 'react'

import { Stepper } from '@/modules/home/ui/components/Stepper'

const dateRepository = new AxiosRepository()
const dateUseCase = new DateUseCase(dateRepository)

function Home() {
  const [dates, setDates] = useState<DateEntity[]>()

  useEffect(() => {
    (async () => {
      const { data } = await dateUseCase.listDates(1, 100)
      setDates(data)
    })()
  }, [])

  return (
    <div className='h-full w-full flex justify-center p-4 sm:p-6'>
      {dates ? <Stepper dates={dates} /> : undefined}
    </div>
  )
}

export { Home }