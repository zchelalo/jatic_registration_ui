import { DateEntity } from '@/modules/date/domain/entity'
import { ClassEntity } from '@/modules/class/domain/entity'

import { toast } from 'sonner'
import moment from 'moment'

import { useState } from 'react'

import { Step } from '@/modules/home/ui/components/Step'
import { Confirm } from '../Confirm'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

import { TiTick } from 'react-icons/ti'
import { HiOutlineAcademicCap } from 'react-icons/hi2'

import '@/modules/home/ui/components/Stepper/Stepper.css'
import { DialogClose } from '@radix-ui/react-dialog'

export type SelectedClassType = {
  date: DateEntity
  class: ClassEntity
}

type StepperProps = {
  classes: ClassEntity[]
  dates: DateEntity[]
}

const Stepper = ({
  classes,
  dates
}: StepperProps) => {
  const steps = [...dates, 'Confirmar']
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedClasses, setSelectedClasses] = useState<SelectedClassType[]>([])
  const [complete, setComplete] = useState(false)
  const [next, setNext] = useState(false)

  const renderStepContent = () => {
    for (let i = 0; i < steps.length; i++) {
      const step = steps[i]

      if (i + 1 === currentStep) {
        if (typeof step === 'string') {
          return (
            <Confirm
              selectedClasses={selectedClasses}
            />
          )
        }

        const classesToShow = []

        const classesOfDay = classes.filter(classObtained => 
          classObtained.dates.some(date => date.day === step.day)
        )
        
        for (const classOfDay of classesOfDay) {
          const firstDate = classOfDay.dates
            .reduce((earliest: DateEntity | null, current) => {
              return (!earliest || current.startTime < earliest.startTime) ? current : earliest
            }, null)
        
          if (firstDate && firstDate.day === step.day) {
            classesToShow.push(classOfDay)
          }
        }

        return (
          <Step
            date={step}
            classesToShow={classesToShow}
            selectedClasses={selectedClasses || []}
            next={next}
            onSubmit={handleNext}
          />
        )
      }
    }
  }

  const handleNext = (selectedClass: SelectedClassType) => {
    if (currentStep === steps.length) {
      setComplete(true)
      return
    }

    setSelectedClasses(prev => [...prev, selectedClass])
    setCurrentStep(prev => prev + 1)
    setNext(true)
  }

  const handleStepClick = (i: number) => {
    if (i !== currentStep && i !== currentStep - 1) {
      toast.error('No puedes saltarte pasos')
      return
    }

    let toBack = 0
    if (i === currentStep - 1) {
      for (let j = selectedClasses.length - 1; j > 0; j--) {
        const selectedClass = selectedClasses[j]

        if (selectedClass.class.id === selectedClasses[j - 1].class.id) {
          toBack++
        } else {
          break
        }
      }

      setSelectedClasses(prev => prev.slice(0, prev.length - 1 - toBack))
      setComplete(false)
    }

    setNext(false)
    setCurrentStep(i - toBack)
  }

  return (
    <div className='w-full flex justify-center'>
      <div className='relative w-full md:w-2/3 xl:w-1/2 py-8 px-8 md:px-0'>
        <div className='w-full flex justify-center'>
          {steps?.map((step, i) => (
            <button
              key={i}
              onClick={() => handleStepClick(i + 1)}
              className={`w-full pointer-events-auto step-item ${currentStep === i + 1 && 'active'} ${(i + 1 < currentStep || complete) && 'complete'}`}
            >
              <div className='step'>
                {i + 1 < currentStep || complete ? <TiTick size={24} /> : i + 1}
              </div>
            </button>
          ))}
        </div>

        <div className='flex justify-center items-center mt-6'>
          {renderStepContent()}
        </div>

        <Dialog>
          <DialogTrigger className='absolute right-0 bottom-0 rounded-full back-secondary p-3'>
            <HiOutlineAcademicCap
              className='text-3xl'
            />
          </DialogTrigger>
          <DialogContent className='w-10/12 max-h-[80%] back-secondary border-0 overflow-y-auto rounded'>
            <section className='w-full flex flex-col justify-center'>
              <DialogHeader className='mb-4 mt-2 sm:px-2'>
                <DialogTitle>
                  Información de los talleres
                </DialogTitle>
              </DialogHeader>
              <div className='w-full grid grid-cols-1 sm:grid-cols-2'>
                {classes.map(classObtained => (
                  <article key={classObtained.id} className='mb-4 sm:p-2'>
                    <h2 className='font-medium'>
                      {classObtained.name} | {classObtained.teacher.user.name} {classObtained.teacher.user.lastName1} {classObtained.teacher.user.lastName2} 
                    </h2>
                    <p className='text-sm'>
                      {classObtained.description}
                    </p>
                    <ul className='text-pretty mt-1'>
                      <h4 className='text-sm font-medium'>
                        Fechas y horarios
                      </h4>
                      {classObtained.dates.map(date => (
                        <li className='text-sm'>
                          {moment(date.day).utc(false).format('DD-MM-YYYY')} | {moment(date.startTime).utc(true).format('HH:MM')} - {moment(date.endTime).utc(true).format('HH:MM')}
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
              <DialogFooter className='sm:justify-start my-2 sm:px-2'>
                <DialogClose asChild>
                  <Button type='button' className='btn-secondary'>
                    Cerrar
                  </Button>
                </DialogClose>
              </DialogFooter>
            </section>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

export { Stepper }
