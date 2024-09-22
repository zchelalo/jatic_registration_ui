import { UtEntity } from '../../domain/entity'
import { UtRepository } from '../../domain/repository'

const uts: UtEntity[] = [
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


export class MemoryRepository implements UtRepository {
  async listUts(page: number, limit: number): Promise<UtEntity[]> {
    const start = (page - 1) * limit
    const end = start + limit
    const utsObtained = uts.slice(start, end)
    if (utsObtained.length === 0) {
      throw new Error('No UTs found')
    }
    return utsObtained
  }
}