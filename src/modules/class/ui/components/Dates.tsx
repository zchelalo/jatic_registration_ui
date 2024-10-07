import { ClassEntity } from '@/modules/class/domain/entity'
import { DateEntity } from '@/modules/date/domain/entity'
import { AxiosRepository } from '@/modules/date/infrastructure/repositories/axios'
import { DateUseCase } from '@/modules/date/application/use_cases/date'

import { DateType } from '@/types/date'

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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { AddDate } from '@/modules/class/ui/components/AddDate'

import { HiOutlineXMark } from 'react-icons/hi2'

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
  const [dateType, setDateType] = useState<DateType[]>([])
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [openAddModal, setOpenAddModal] = useState(false)
  const [selectedDate, setSelectedDate] = useState<DateEntity | null>(null)

  useEffect(() => {
    (async () => {
      if (!selectedClass) {
        return
      }

      const { data } = await dateUseCase.listDatesByClassId(selectedClass.id)
      setDates(data)
    })()
  }, [])

  useEffect(() => {
    const createDate = async () => {
      if (!dateType || dateType.length === 0) {
        return
      }
  
      await dateUseCase.createDate(selectedClass.id, dateType[0].day, dateType[0].startTime, dateType[0].endTime)
      setDateType([])

      const { data } = await dateUseCase.listDatesByClassId(selectedClass.id)
      setDates(data)
    }

    createDate()
  }, [dateType])

  return (
    <>
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
                <CardContent className='w-full flex justify-between items-center p-2 m-0'>
                  <p>{moment(date.day).utc(false).format('DD-MM-YYYY')} | {moment(date.startTime).utc(false).format('HH:mm')} - {moment(date.endTime).utc(false).format('HH:mm')}</p>
                  <Button
                    type='button'
                    className='bg-transparent hover:bg-transparent hover:text-red-900 text-red-600 rounded-full'
                    onClick={() => {
                      setSelectedDate(date)
                      setOpenDeleteModal(true)
                    }}
                  >
                    <HiOutlineXMark className='text-2xl' />
                  </Button>
                </CardContent>
              </Card>
            ))}
            <Button
              type='button'
              className='btn-quaternary mt-4'
              onClick={() => {
                setOpenAddModal(true)
              }}
            >
              Agregar fecha
            </Button>
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
      <AlertDialog
        open={openDeleteModal}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estas seguro de eliminar esta fecha?</AlertDialogTitle>
            <AlertDialogDescription>
              La fecha será eliminada, para reactivarla deberás agregarla manualmente
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setOpenDeleteModal(false)
                setSelectedDate(null)
              }}
              className='btn'
            >
              Cerrar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                if (!selectedDate) {
                  return
                }

                await dateUseCase.deleteDate(selectedClass.id, selectedDate.id as string)

                const { data } = await dateUseCase.listDatesByClassId(selectedClass.id)
                setDates(data)

                setOpenDeleteModal(false)
                setSelectedDate(null)
              }}
              className='btn-quaternary'
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {dates ? (
        <AddDate
          openAddModal={openAddModal}
          setOpenAddModal={setOpenAddModal}
          dates={dateType}
          setDates={setDateType}
        />
      ) : undefined}
    </>
  )
}

export { Dates }