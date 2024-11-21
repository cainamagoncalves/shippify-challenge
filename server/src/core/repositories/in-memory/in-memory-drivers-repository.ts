import { Driver } from '@/core/entities/driver'
import { DriversRepository } from '../drivers-repository'

export class InMemoryDriversRepository implements DriversRepository {
  public items: Driver[] = []

  async create(data: Driver): Promise<Driver> {
    this.items.push(data)

    return data
  }

  async findById(driverId: number): Promise<Driver | null> {
    const driver = this.items.find((item) => item.id === driverId)

    if (!driver) {
      return null
    }

    return driver
  }

  async findByEmail(email: string): Promise<Driver | null> {
    const driver = this.items.find((item) => item.email === email)

    if (!driver) {
      return null
    }

    return driver
  }

  async findManyByCompany(
    page: number,
    limit: number,
    companyId: number,
  ): Promise<Driver[]> {
    return this.items
      .filter((item) => item.companyId === companyId)
      .slice((page - 1) * limit, page * limit)
  }

  async countByCompany(companyId: number): Promise<number> {
    return this.items.filter((item) => item.companyId === companyId).length
  }
}