import { TeacherEntity } from '@/modules/teacher/domain/entity'
import { AxiosRepository } from '@/modules/teacher/infrastructure/repositories/axios'
import { TeacherUseCase } from '@/modules/teacher/application/use_cases/teacher'

import { Meta } from '@/types/meta'

import { toast } from 'sonner'

import { useState, useEffect } from 'react'
import { useTeacherColumns } from '@/modules/teacher/ui/hooks/useTeacherColumns'

import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/DataTable'
import { EditModal } from '@/modules/teacher/ui/components/EditModal'
import { CreateModal } from '@/modules/teacher/ui/components/CreateModal'
import { DeleteModal } from '@/modules/teacher/ui/components/DeleteModal'

import { HiOutlinePlus } from 'react-icons/hi2'

const teacherRepository = new AxiosRepository()
const teacherUseCase = new TeacherUseCase(teacherRepository)

function Teacher() {
  const [openEditModal, setOpenEditModal] = useState(false)
  const [openCreateModal, setOpenCreateModal] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [selectedTeacher, setSelectedTeacher] = useState<TeacherEntity | null>()

  const [teachers, setTeachers] = useState<TeacherEntity[]>()
  const [meta, setMeta] = useState<Meta>()

  useEffect(() => {
    (async () => {
      await getTeachers(1, 10)
    })()
  }, [])

  const getTeachers = async (page: number, limit: number) => {
    try {
      const teachersObtained = await teacherUseCase.listTeachers(page, limit)
      setTeachers(teachersObtained.data)
      setMeta(teachersObtained.meta)
    } catch (error) {
      console.log(error)
      toast.error('Ocurrio un error al traer a los maestros')
    }
  }

  const { teacherColumns } = useTeacherColumns({
    setOpenEditModal,
    setOpenDeleteModal,
    setSelectedTeacher
  })

  return (
    <section className='w-full h-full p-6 sm:p-10'>
      {selectedTeacher ? (
        <EditModal
          openEditModal={openEditModal}
          setOpenEditModal={setOpenEditModal}
          selectedTeacher={selectedTeacher}
          setSelectedTeacher={setSelectedTeacher}
        />
      ): undefined}

      {teachers ? (
        <CreateModal
          openCreateModal={openCreateModal}
          setOpenCreateModal={setOpenCreateModal}
          teachers={teachers}
          setTeachers={setTeachers}
        />
      ) : undefined}

      {(selectedTeacher && meta) ? (
        <DeleteModal
          openDeleteModal={openDeleteModal}
          setOpenDeleteModal={setOpenDeleteModal}
          selectedTeacher={selectedTeacher}
          setSelectedTeacher={setSelectedTeacher}
          meta={meta}
          getTeachers={getTeachers}
        />
      ): undefined}

      <h1 className='flex items-center text-2xl font-bold mb-3'>
        Talleristas
        <Button
          className='btn-icon ml-3 rounded-full p-2'
          onClick={() => setOpenCreateModal(true)}
        >
          <HiOutlinePlus className='text-2xl' />
        </Button>
      </h1>
      {(teachers?.length && teachers.length > 0 && meta) ? (
        <DataTable
          columns={teacherColumns}
          data={teachers}
          meta={meta}
          getData={getTeachers}
        />
      ) : undefined}
    </section>
  )
}

export { Teacher }