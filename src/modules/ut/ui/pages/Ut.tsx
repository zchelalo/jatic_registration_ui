import { UtEntity } from '@/modules/ut/domain/entity'
import { AxiosRepository } from '@/modules/ut/infrastructure/repositories/axios'
import { UtUseCase } from '@/modules/ut/application/use_cases/ut'

import { Meta } from '@/types/meta'

import { toast } from 'sonner'

import { useState, useEffect } from 'react'
import { useUtColumns } from '@/modules/ut/ui/hooks/useUtColumns'

import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/DataTable'
import { EditModal } from '@/modules/ut/ui/components/EditModal'
import { CreateModal } from '@/modules/ut/ui/components/CreateModal'
import { DeleteModal } from '@/modules/ut/ui/components/DeleteModal'

import { HiOutlinePlus } from 'react-icons/hi2'

const utRepository = new AxiosRepository()
const utUseCase = new UtUseCase(utRepository)

function Ut() {
  const [openEditModal, setOpenEditModal] = useState(false)
  const [openCreateModal, setOpenCreateModal] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [selectedUt, setSelectedUt] = useState<UtEntity | null>()

  const [uts, setUts] = useState<UtEntity[]>()
  const [meta, setMeta] = useState<Meta>()

  useEffect(() => {
    (async () => {
      await getUts(1, 10)
    })()
  }, [])

  const getUts = async (page: number, limit: number) => {
    try {
      const utsObtained = await utUseCase.listUts(page, limit)
      setUts(utsObtained.data)
      setMeta(utsObtained.meta)
    } catch (error) {
      console.log(error)
      toast.error('Ocurrio un error al traer a las universidades')
    }
  }

  const { utColumns } = useUtColumns({
    setOpenEditModal,
    setOpenDeleteModal,
    setSelectedUt
  })

  return (
    <section className='w-full h-full p-6 sm:p-10'>
      {(selectedUt && uts) ? (
        <EditModal
          openEditModal={openEditModal}
          setOpenEditModal={setOpenEditModal}
          selectedUt={selectedUt}
          setSelectedUt={setSelectedUt}
          uts={uts}
          setUts={setUts}
        />
      ): undefined}

      {uts ? (
        <CreateModal
          openCreateModal={openCreateModal}
          setOpenCreateModal={setOpenCreateModal}
          uts={uts}
          setUts={setUts}
        />
      ) : undefined}

      {(selectedUt && meta) ? (
        <DeleteModal
          openDeleteModal={openDeleteModal}
          setOpenDeleteModal={setOpenDeleteModal}
          selectedUt={selectedUt}
          setSelectedUt={setSelectedUt}
          meta={meta}
          getUts={getUts}
        />
      ): undefined}

      <h1 className='flex items-center text-2xl font-bold mb-3'>
        Universidades
        <Button
          className='btn-icon ml-3 rounded-full p-2'
          onClick={() => setOpenCreateModal(true)}
        >
          <HiOutlinePlus className='text-2xl' />
        </Button>
      </h1>
      {(uts?.length && uts.length > 0 && meta) ? (
        <DataTable
          columns={utColumns}
          data={uts}
          meta={meta}
          getData={getUts}
        />
      ) : undefined}
    </section>
  )
}

export { Ut }