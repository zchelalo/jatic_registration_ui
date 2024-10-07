import { ClassEntity } from '@/modules/class/domain/entity'
import { DateEntity } from '@/modules/date/domain/entity'
import { AxiosRepository } from '@/modules/date/infrastructure/repositories/axios'
import { DateUseCase } from '@/modules/date/application/use_cases/date'

import moment from 'moment'

import { useEffect, useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const dateRepository = new AxiosRepository()
const dateUseCase = new DateUseCase(dateRepository)

type DatesProps = {
  openDatesModal: boolean
  setOpenDatesModal: (open: boolean) => void
  selectedClass: ClassEntity
  setSelectedClass: (selectedClass: ClassEntity | null) => void
}

function Dates({
  openDatesModal,
  setOpenDatesModal,
  selectedClass,
  setSelectedClass
}: DatesProps) {
  const [dates, setDates] = useState<DateEntity[]>([])

  useEffect(() => {
    (async () => {
      if (!selectedClass) {
        return
      }

      const { data } = await dateUseCase.listDatesByClassId(selectedClass.id)
      setDates(data)
    })()
  }, [])

  return (
    <Dialog
      open={openDatesModal}
    >
      <DialogContent className='back w-10/12 sm:w-full max-h-[80vh] overflow-y-auto rounded'>
        <DialogHeader>
          <DialogTitle>
            Fechas
          </DialogTitle>
          <DialogDescription>
            Estas son las fechas en las que se llevará a cabo el taller
          </DialogDescription>
        </DialogHeader>
        <div className='w-full flex flex-col justify-start'>
          {dates?.map((date) => (
            <Card
              key={date.id}
              className='back-secondary flex justify-center items-center'
            >
              <CardContent className='p-2 m-0'>
                <p>{moment(date.day).format('DD-MM-YYYY')} | {moment(date.startTime).format('HH:mm')} - {moment(date.endTime).format('HH:mm')}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              onClick={() => {
                setOpenDatesModal(false)
                setSelectedClass(null)
              }}
              className='btn mt-2 sm:mt-0'
            >
              Cerrar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export { Dates }