import { toast } from 'sonner'

import { useState } from 'react'

import { Step } from '@/modules/home/ui/components/Step'

import { TiTick } from 'react-icons/ti'

import '@/modules/home/ui/components/Stepper/Stepper.css'
import { DateEntity } from '@/modules/date/domain/entity'

type StepperProps = {
  dates: DateEntity[]
}

const Stepper = ({
  dates
}: StepperProps) => {
  const steps = [...dates, 'Confirmar']
  const [currentStep, setCurrentStep] = useState(1)
  const [complete, setComplete] = useState(false)

  const renderStepContent = () => {
    for (let i = 0; i < steps.length; i++) {
      const step = steps[i]

      if (i + 1 === currentStep) {
        if (typeof step === 'string') {
          return <div>Confirmar</div>
        }

        return <Step date={step} />
      }
    }
  }

  const handleNext = () => {
    if (currentStep === steps.length) {
      setComplete(true)
      return
    }

    setCurrentStep(currentStep + 1)
  }

  const handleStepClick = (i: number) => {
    if (i === currentStep || i === currentStep - 1 || i === currentStep + 1) {
      setCurrentStep(i)
      return
    }

    toast.error('No puedes saltarte pasos')
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

        {!complete && (
          <div className='flex justify-center items-center mt-6'>
            <button
              className='btn w-full'
              onClick={handleNext}
            >
              {currentStep === steps.length ? 'Finalizar Elección' : 'Siguiente'}
            </button>
          </div>
        )}
      </div>

    </div>
  )
}

export { Stepper }
