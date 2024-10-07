import { CareerEntity } from '@/modules/career/domain/entity'
import { AxiosRepository } from '@/modules/career/infrastructure/repositories/axios'
import { CareerUseCase } from '@/modules/career/application/use_cases/career'

import { Meta } from '@/types/meta'

import { toast } from 'sonner'

import { useState, useEffect } from 'react'
import { useCareerColumns } from '@/modules/career/ui/hooks/useCareerColumns'

import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/DataTable'
import { EditModal } from '@/modules/career/ui/components/EditModal'
import { CreateModal } from '@/modules/career/ui/components/CreateModal'
import { DeleteModal } from '@/modules/career/ui/components/DeleteModal'

import { HiOutlinePlus } from 'react-icons/hi2'

const careerRepository = new AxiosRepository()
const careerUseCase = new CareerUseCase(careerRepository)

function Career() {
  const [openEditModal, setOpenEditModal] = useState(false)
  const [openCreateModal, setOpenCreateModal] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [selectedCareer, setSelectedCareer] = useState<CareerEntity | null>()

  const [careers, setCareers] = useState<CareerEntity[]>()
  const [meta, setMeta] = useState<Meta>()

  useEffect(() => {
    (async () => {
      await getCareers(1, 10)
    })()
  }, [])

  const getCareers = async (page: number, limit: number) => {
    try {
      const careersObtained = await careerUseCase.listCareers(page, limit)
      setCareers(careersObtained.data)
      setMeta(careersObtained.meta)
    } catch (error) {
      console.log(error)
      toast.error('Ocurrio un error al traer a las carreras')
    }
  }

  const { careerColumns } = useCareerColumns({
    setOpenEditModal,
    setOpenDeleteModal,
    setSelectedCareer
  })

  return (
    <section className='w-full h-full p-6 sm:p-10'>
      {(selectedCareer && careers) ? (
        <EditModal
          openEditModal={openEditModal}
          setOpenEditModal={setOpenEditModal}
          selectedCareer={selectedCareer}
          setSelectedCareer={setSelectedCareer}
          careers={careers}
          setCareers={setCareers}
        />
      ): undefined}

      {careers ? (
        <CreateModal
          openCreateModal={openCreateModal}
          setOpenCreateModal={setOpenCreateModal}
          careers={careers}
          setCareers={setCareers}
        />
      ) : undefined}

      {(selectedCareer && meta) ? (
        <DeleteModal
          openDeleteModal={openDeleteModal}
          setOpenDeleteModal={setOpenDeleteModal}
          selectedCareer={selectedCareer}
          setSelectedCareer={setSelectedCareer}
          meta={meta}
          getCareers={getCareers}
        />
      ): undefined}

      <h1 className='flex items-center text-2xl font-bold mb-3'>
        Carreras
        <Button
          className='btn-icon ml-3 rounded-full p-2'
          onClick={() => setOpenCreateModal(true)}
        >
          <HiOutlinePlus className='text-2xl' />
        </Button>
      </h1>
      {(careers?.length && careers.length > 0 && meta) ? (
        <DataTable
          columns={careerColumns}
          data={careers}
          meta={meta}
          getData={getCareers}
        />
      ) : undefined}
    </section>
  )
}

export { Career }