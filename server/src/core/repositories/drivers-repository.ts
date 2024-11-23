import { Driver } from '../entities/driver'

export interface SearchManyDriversFilters {
  companyId?: number
}
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
  searchMany(
    page: number,
    limit: number,
    filters: SearchManyDriversFilters,
  ): Promise<Driver[]>
  count(filters: SearchManyDriversFilters): Promise<number>
}
