import { useState, useEffect } from 'react'
import { MemoryRepository as TallerMemoryRepository } from '@/modules/taller17/infrastructure/repositories/memory'
import { TallerUseCase } from '@/modules/taller17/application/use_cases/taller17'
import { TallerEntity } from '@/modules/taller17/domain/entity'
import { toast } from 'sonner'

function StepTwo() {

  const tallerRepository = new TallerMemoryRepository()
  const tallerUseCase = new TallerUseCase(tallerRepository)

  const [tallers, setTallers] = useState<TallerEntity[]>()

  useEffect(() => {
    const fetchTallers = async () => {
      try {
        const response = await tallerUseCase.listTaller17(1, 10)
        setTallers(response)
      } catch (error) {
        console.error(error)
        toast.error('An error occurred while trying to fetch the tallers')
      }
    }

    fetchTallers()
  }, [])

  return (
    <div className="w-full">
      <div>
        <h1 className="text-2xl sm:text-4xl font-bold py-3">Talleres disponibles del 17 de Octubre</h1>
      </div>
      <select
        className="w-full h-10 border border-gray-300 rounded-md px-2"
        name="workshop"
        id="workshop"
      >
        <option value="">Selecciona un taller</option>
        {tallers?.map((taller) => (
          <option key={taller.id} value={taller.id}>
            {taller.key}
          </option>
        ))}
      </select>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
        <div>
          <h2 className="font-medium text-lg">Descripción del taller</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, inventore fugiat possimus quisquam voluptate fuga fugit ex dignissimos quidem quo molestias eius eveniet hic quae? Atque cupiditate deleniti quisquam dicta? Sit a omnis aliquam necessitatibus repudiandae nemo illum accusamus voluptatibus, perferendis placeat cumque quod numquam architecto pariatur consectetur impedit dignissimos praesentium. Dicta modi placeat sequi vitae id, odio ipsam impedit, officia porro nulla dignissimos atque perferendis? Consectetur, necessitatibus culpa labore nihil accusantium numquam adipisci odit aut inventore aliquid facilis quasi repellendus? Id quaerat ipsam nemo dolores labore, in ullam laudantium ut fugiat, ab est adipisci eveniet consequuntur temporibus beatae officia?
          </p>
        </div>

        <div>
          <h2 className="font-medium text-lg" >Tallerista</h2>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et incidunt excepturi eligendi, accusantium dignissimos maiores iure quod facere ipsa est quisquam ab tempore facilis laboriosam laudantium nostrum quam at, a illo ducimus fugiat! Eius, excepturi! Porro asperiores aut molestias vel vero quod reiciendis non blanditiis ipsam quasi nihil a aspernatur, consequatur perferendis itaque quo illo, sequi excepturi dolorum nisi? Alias et odio ea incidunt quas itaque veniam, quam, consequuntur, molestias atque voluptas accusantium nisi sed quo laboriosam cupiditate. Quam, corporis quasi, deserunt pariatur magnam quidem dignissimos, porro qui fugit inventore at. Nostrum similique itaque nihil sequi laborum necessitatibus porro illo.
          </p>
        </div>
      </div>
    </div>
  )
}

export { StepTwo }