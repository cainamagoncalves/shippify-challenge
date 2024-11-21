import { Driver } from '../entities/driver'

export interface DriversRepository {
  findById(driverId: number): Promise<Driver | null>
  create(data: Driver): Promise<Driver>
  findByEmail(email: string): Promise<Driver | null>
  findManyByCompany(
    page: number,
    limit: number,
    companyId: number,
  ): Promise<Driver[]>
  countByCompany(companyId: number): Promise<number>
}
