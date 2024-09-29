import { useState } from 'react'

import { toast } from 'sonner'

import { StepOne } from '@/modules/home/ui/components/StepOne'
import { StepTwo } from '@/modules/home/ui/components/StepTwo'
import { StepThree } from '@/modules/home/ui/components/StepThree'

import { TiTick } from 'react-icons/ti'

import '@/components/Stepper/Stepper.css'

const Stepper = () => {
  const steps = [' ', ' ', ' ']
  const [currentStep, setCurrentStep] = useState(1)
  const [complete, setComplete] = useState(false)

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <StepOne />
      case 2:
        return <StepTwo />
      case 3:
        return <StepThree />
      default:
        return null
    }
  }

  const handleNext = () => {
    if (currentStep === steps.length) {
      setComplete(true)
    } else {
      setCurrentStep(currentStep + 1)
    }
  }
  const handleStepClick = (i: number) => {
    if (i === currentStep || i === currentStep - 1 || i === currentStep + 1) {
      setCurrentStep(i)
    } else {
      toast.error('No puedes saltarte pasos')
    }
  }
  return (
    <div className='flex justify-center items-center'>
      <div className='w-full md:w-2/3 xl:w-1/2 py-7 px-8 md:px-0'>
        <div className='flex w-full justify-center items-center'>
          {steps?.map((step, i) => (
            <div
              key={i}
              onClick={() => handleStepClick(i + 1)}
              className={`w-full pointer-events-auto step-item ${currentStep === i + 1 && 'active'} ${(i + 1 < currentStep || complete) && 'complete'
                } `}
            >
              <div className='step'>
                {i + 1 < currentStep || complete ? <TiTick size={24} /> : i + 1}
              </div>
              <p className='text-gray-500'>{step}</p>
            </div>
          ))}
        </div>
        <div className='flex justify-center items-center pt-6'>{renderStepContent()}</div>

        {!complete && (
          <div className='flex justify-center items-center'>
            <button
              className='w-full h-10 border border-gray-200 bg-white rounded-md px-2'
              onClick={handleNext}
            >
              {currentStep === steps.length ? 'Finalizar Elección' : 'Escoger'}
            </button>
          </div>
        )}
      </div>

    </div>
  )
}

export { Stepper }
