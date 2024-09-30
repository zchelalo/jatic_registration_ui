import { toast } from 'sonner'

import { useState } from 'react'

import { Step } from '@/modules/home/ui/components/Step'

import { TiTick } from 'react-icons/ti'

import '@/modules/home/ui/components/Stepper/Stepper.css'
import { DateEntity } from '@/modules/date/domain/entity'
import { ClassEntity } from '@/modules/class/domain/entity'
import { Confirm } from '../Confirm'

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
      <div className='w-full md:w-2/3 xl:w-1/2 py-7 px-8 md:px-0'>
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
      </div>

    </div>
  )
}

export { Stepper }
