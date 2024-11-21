import { Company } from '../entities/company'

export interface CompaniesRepository {
  create(company: Company): Promise<Company>
  findByName(name: string): Promise<Company | null>
  searchMany(page: number, limit: number): Promise<Company[]>
  count(): Promise<number>
  findById(companyId: number): Promise<Company | null>
}
