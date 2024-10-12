import { StudentEntity } from '@/modules/student/domain/entity'
import { UtEntity } from '@/modules/ut/domain/entity'
import { CareerEntity } from '@/modules/career/domain/entity'
import { AxiosRepository as StudentRepository } from '@/modules/student/infrastructure/repositories/axios'
import { AxiosRepository as UtRepository } from '@/modules/ut/infrastructure/repositories/axios'
import { AxiosRepository as CareerRepository } from '@/modules/career/infrastructure/repositories/axios'
import { StudentUseCase } from '@/modules/student/application/use_cases/student'
import { UtUseCase } from '@/modules/ut/application/use_cases/ut'
import { CareerUseCase } from '@/modules/career/application/use_cases/career'

import { Meta } from '@/types/meta'

import { toast } from 'sonner'

import { useState, useEffect, useCallback } from 'react'
import { useStudentColumns } from '@/modules/student/ui/hooks/useStudentColumns'

import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/DataTable'
import { EditModal } from '@/modules/student/ui/components/EditModal'
import { CreateModal } from '@/modules/student/ui/components/CreateModal'
import { DeleteModal } from '@/modules/student/ui/components/DeleteModal'

import { HiOutlinePlus } from 'react-icons/hi2'

const studentRepository = new StudentRepository()
const studentUseCase = new StudentUseCase(studentRepository)

const utRepository = new UtRepository()
const utUseCase = new UtUseCase(utRepository)

const careerRepository = new CareerRepository()
const careerUseCase = new CareerUseCase(careerRepository)

function Student() {
  const [openEditModal, setOpenEditModal] = useState(false)
  const [openCreateModal, setOpenCreateModal] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<StudentEntity | null>()

  const [uts, setUts] = useState<UtEntity[]>()
  const [careers, setCareers] = useState<CareerEntity[]>()

  const [students, setStudents] = useState<StudentEntity[]>()
  const [meta, setMeta] = useState<Meta>()

  const [totalStudents, setTotalStudents] = useState(0)
  const [hasChanged, setHasChanged] = useState(false)
  const [totalStudentsEnrolled, setTotalStudentsEnrolled] = useState(0)
  const [totalStudentsPaid, setTotalStudentsPaid] = useState(0)

  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    (async () => {
      await getStudents(1, 10)

      const totalEnrolled = await studentUseCase.countStudentsEnrolled()
      setTotalStudentsEnrolled(totalEnrolled.data)

      const totalPaid = await studentUseCase.countStudentsPaid()
      setTotalStudentsPaid(totalPaid.data)

      try {
        const response = await careerUseCase.listCareers(1, 100)
        setCareers(response.data)
      } catch (error) {
        console.error(error)
        toast.error('Un error ocurrió al intentar traer las carreras')
      }

      try {
        const response = await utUseCase.listUts(1, 100)
        setUts(response.data)
      } catch (error) {
        console.error(error)
        toast.error('Un error ocurrió al intentar traer las universidades')
      }
    })()
  }, [])

  const getStudents = async (page: number, limit: number, search?: string) => {
    try {
      const studentsObtained = await studentUseCase.listStudents(page, limit, search)
      setStudents(studentsObtained.data)
      setMeta(studentsObtained.meta)

      if (!hasChanged) {
        if (!studentsObtained.meta) {
          return
        }

        const totalEnrolled = studentsObtained.meta.totalCount
        setTotalStudents(totalEnrolled)
        setHasChanged(true)
      }
    } catch (error) {
      console.log(error)
      toast.error('Ocurrio un error al traer a los estudiantes')
    }
  }

  const debouncedSearch = useCallback(debounce(getStudents, 500), [])

  const handleSearchValue = (value: string) => {
    setSearchValue(value)
    if (meta) {
      debouncedSearch(meta.page, meta.perPage, value)
    } else {
      debouncedSearch(1, 10, value)
    }
  }

  const { studentColumns } = useStudentColumns({
    setOpenEditModal,
    setOpenDeleteModal,
    setSelectedStudent
  })

  return (
    <section className='w-full h-full p-6 sm:p-10'>
      {(selectedStudent && students) ? (
        <EditModal
          openEditModal={openEditModal}
          setOpenEditModal={setOpenEditModal}
          selectedStudent={selectedStudent}
          setSelectedStudent={setSelectedStudent}
          students={students}
          setStudents={setStudents}
        />
      ): undefined}

      {(students && uts && careers) ? (
        <CreateModal
          openCreateModal={openCreateModal}
          setOpenCreateModal={setOpenCreateModal}
          students={students}
          setStudents={setStudents}
          uts={uts}
          careers={careers}
        />
      ) : undefined}

      {(selectedStudent && meta) ? (
        <DeleteModal
          openDeleteModal={openDeleteModal}
          setOpenDeleteModal={setOpenDeleteModal}
          selectedStudent={selectedStudent}
          setSelectedStudent={setSelectedStudent}
          meta={meta}
          getStudents={getStudents}
        />
      ): undefined}

      <h1 className='flex items-center text-2xl font-bold mb-3'>
        Estudiantes
        <Button
          className='btn-icon ml-3 rounded-full p-2'
          onClick={() => setOpenCreateModal(true)}
        >
          <HiOutlinePlus className='text-2xl' />
        </Button>
      </h1>
      <article className='flex items-center justify-start space-x-1 mb-1'>
        <span className='back-secondary rounded p-1 text-sm font-medium'>
          Total: {totalStudents}
        </span>
        <span className='back-secondary rounded p-1 text-sm font-medium'>
          Inscritos: {totalStudentsEnrolled}
        </span>
        <span className='back-secondary rounded p-1 text-sm font-medium'>
          Pagados: {totalStudentsPaid}
        </span>
      </article>
      {meta ? (
        <DataTable
          columns={studentColumns}
          data={students || []}
          meta={meta}
          getData={getStudents}
          searchInput={true}
          searchValue={searchValue}
          handleSearchValue={handleSearchValue}
        />
      ) : undefined}
    </section>
  )
}

function debounce<T extends (...args: Parameters<T>) => ReturnType<T>>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>): void => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      func(...args)
    }, wait)
  }
}

export { Student }