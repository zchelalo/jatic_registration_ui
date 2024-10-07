import { ClassEntity } from '@/modules/class/domain/entity'
import { TeacherEntity } from '@/modules/teacher/domain/entity'
import { AxiosRepository } from '@/modules/class/infrastructure/repositories/axios'
import { AxiosRepository as TeacherRepository } from '@/modules/teacher/infrastructure/repositories/axios'
import { ClassUseCase } from '@/modules/class/application/use_cases/class'
import { TeacherUseCase } from '@/modules/teacher/application/use_cases/teacher'

import { Meta } from '@/types/meta'

import { toast } from 'sonner'

import { useState, useEffect } from 'react'
import { useClassColumns } from '@/modules/class/ui/hooks/useClassColumns'

import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/DataTable'
import { EditModal } from '@/modules/class/ui/components/EditModal'
import { CreateModal } from '@/modules/class/ui/components/CreateModal'
import { DeleteModal } from '@/modules/class/ui/components/DeleteModal'
import { Dates } from '@/modules/class/ui/components/Dates'

import { HiOutlinePlus } from 'react-icons/hi2'

const classRepository = new AxiosRepository()
const classUseCase = new ClassUseCase(classRepository)

const teacherRepository = new TeacherRepository()
const teacherUseCase = new TeacherUseCase(teacherRepository)

function Class() {
  const [openDatesModal, setOpenDatesModal] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false)
  const [openCreateModal, setOpenCreateModal] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [selectedClass, setSelectedClass] = useState<ClassEntity | null>()

  const [teachers, setTeachers] = useState<TeacherEntity[]>()

  const [classes, setClasses] = useState<ClassEntity[]>()
  const [meta, setMeta] = useState<Meta>()

  useEffect(() => {
    (async () => {
      await getClasses(1, 10)
    })()
  }, [])

  useEffect(() => {
    (async () => {
      try {
        const teachersObtained = await teacherUseCase.listTeachers(1, 100)
        setTeachers(teachersObtained.data)
      } catch (error) {
        console.log(error)
        toast.error('Ocurrio un error al traer a los talleristas')
      }
    })()
  }, [])

  const getClasses = async (page: number, limit: number) => {
    try {
      const classesObtained = await classUseCase.listAllClasses(page, limit)
      setClasses(classesObtained.data)
      setMeta(classesObtained.meta)
    } catch (error) {
      console.log(error)
      toast.error('Ocurrio un error al traer a las talleres')
    }
  }

  const { classColumns } = useClassColumns({
    setOpenEditModal,
    setOpenDeleteModal,
    setOpenDatesModal,
    setSelectedClass
  })

  return (
    <section className='w-full h-full p-6 sm:p-10'>
      {(selectedClass && classes && teachers) ? (
        <EditModal
          openEditModal={openEditModal}
          setOpenEditModal={setOpenEditModal}
          selectedClass={selectedClass}
          setSelectedClass={setSelectedClass}
          classes={classes}
          setClasses={setClasses}
          teachers={teachers}
        />
      ): undefined}

      {(classes && teachers) ? (
        <CreateModal
          openCreateModal={openCreateModal}
          setOpenCreateModal={setOpenCreateModal}
          classes={classes}
          setClasses={setClasses}
          teachers={teachers}
        />
      ) : undefined}

      {(selectedClass && meta) ? (
        <DeleteModal
          openDeleteModal={openDeleteModal}
          setOpenDeleteModal={setOpenDeleteModal}
          selectedClass={selectedClass}
          setSelectedClass={setSelectedClass}
          meta={meta}
          getClasses={getClasses}
        />
      ): undefined}

      {(selectedClass) ? (
        <Dates
          openDatesModal={openDatesModal}
          setOpenDatesModal={setOpenDatesModal}
          selectedClass={selectedClass}
          setSelectedClass={setSelectedClass}
        />
      ) : undefined}

      <h1 className='flex items-center text-2xl font-bold mb-3'>
        Talleres
        <Button
          className='btn-icon ml-3 rounded-full p-2'
          onClick={() => setOpenCreateModal(true)}
        >
          <HiOutlinePlus className='text-2xl' />
        </Button>
      </h1>
      {(classes?.length && classes.length > 0 && meta) ? (
        <DataTable
          columns={classColumns}
          data={classes}
          meta={meta}
          getData={getClasses}
        />
      ) : undefined}
    </section>
  )
}

export { Class }