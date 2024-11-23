import { Company } from '../entities/company'

export interface SearchManyCompaniesFilters {
  name?: string
}
export interface CompaniesRepository {
  create(company: Company): Promise<Company>
  findByName(name: string): Promise<Company | null>
  searchMany(
    page: number,
    limit: number,
    filters: SearchManyCompaniesFilters,
  ): Promise<Company[]>
  count(filters: SearchManyCompaniesFilters): Promise<number>
  findById(companyId: number): Promise<Company | null>
}
