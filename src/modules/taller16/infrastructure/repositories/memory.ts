import { TallerEntity } from '@/modules/taller16/domain/entity'
import { Taller16Repository } from '@/modules/taller16/domain/repository'

const tallers: TallerEntity[] = [
  { id: '1', key: 'Taller 16 de octubre' },
  { id: '2', key: 'Taller 16 de octubre' },
  { id: '3', key: 'Taller 16 de octubre' },
  { id: '4', key: 'Taller 16 de octubre' },
  { id: '5', key: 'Taller 16 de octubre' },
  { id: '6', key: 'Taller 16 de octubre' },
  { id: '7', key: 'Taller 16 de octubre' },
  { id: '8', key: 'Taller 16 de octubre' },
  { id: '9', key: 'Taller 16 de octubre' },
  { id: '10', key: 'Taller 16 de octubre' }
]


export class MemoryRepository implements Taller16Repository {
  async listTaller16(page: number, limit: number): Promise<TallerEntity[]> {
    const start = (page - 1) * limit
    const end = start + limit
    const tallersObtained = tallers.slice(start, end)
    if (tallersObtained.length === 0) {
      throw new Error('No Careers found')
    }
    return tallersObtained
  }
}