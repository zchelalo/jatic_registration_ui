import { ClassEntity } from '@/modules/class/domain/entity'
import { ClassUseCase } from '@/modules/class/application/use_cases/class'
import { AxiosRepository } from '@/modules/class/infrastructure/repositories/axios'

import { toast } from 'sonner'

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

const classRepository = new AxiosRepository()
const classUseCase = new ClassUseCase(classRepository)

function Attendance() {
  const navigate = useNavigate()

  const [classes, setClasses] = useState<ClassEntity[]>()

  useEffect(() => {
    (async () => {
      try {
        const classesObtained = await classUseCase.listClassesByTeacher(1, 100)
        setClasses(classesObtained.data)
      } catch (error) {
        console.error(error)
        toast.error('Ocurrió un error al obtener las clases')
      }
    })()
  }, [])

  return (
    <section className='w-full h-full p-6 sm:p-10'>
      <h1 className='flex items-center text-2xl font-bold mb-3'>
        Clases disponibles
      </h1>
      <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-2 lg:gap-3'>
        {classes ? classes.map(classObtained => (
          <Card
            key={classObtained.id}
            className='w-full h-full transform transition-transform duration-300 hover:scale-[1.025] cursor-pointer'
            onClick={() => {
              navigate(`/attendance/${classObtained.id}`)
            }}
          >
            <CardHeader>
              <CardTitle>
                {classObtained.name}
              </CardTitle>
              <CardDescription>
                {classObtained.description}
              </CardDescription>
            </CardHeader>
          </Card>
        )) : undefined}
      </div>
    </section>
  )
}

export { Attendance }