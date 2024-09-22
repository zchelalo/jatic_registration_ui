import { CareerEntity } from '../../domain/entity'
import { CareerRepository } from '../../domain/repository'

const careers: CareerEntity[] = [
  { id: '1', key: 'UT1' },
  { id: '2', key: 'UT2' },
  { id: '3', key: 'UT3' },
  { id: '4', key: 'UT4' },
  { id: '5', key: 'UT5' },
  { id: '6', key: 'UT6' },
  { id: '7', key: 'UT7' },
  { id: '8', key: 'UT8' },
  { id: '9', key: 'UT9' },
  { id: '10', key: 'UT10' }
]


export class MemoryRepository implements CareerRepository {
  async listCareers(page: number, limit: number): Promise<CareerEntity[]> {
    const start = (page - 1) * limit
    const end = start + limit
    const careersObtained = careers.slice(start, end)
    if (careersObtained.length === 0) {
      throw new Error('No Careers found')
    }
    return careersObtained
  }
}