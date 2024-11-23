import { Company } from '@/core/entities/company'
import {
  CompaniesRepository,
  SearchManyCompaniesFilters,
} from '../companies-repository'

export class InMemoryCompaniesRepository implements CompaniesRepository {
  public items: Company[] = []

  async create(data: Company): Promise<Company> {
    this.items.push(data)

    return data
  }

  async findByName(name: string): Promise<Company | null> {
    const company = this.items.find((item) => item.name === name)

    if (!company) {
      return null
    }

    return company
  }

  async searchMany(
    page: number,
    limit: number,
    filters: SearchManyCompaniesFilters,
  ): Promise<Company[]> {
    return this.items
      .filter((item) => {
        const nameFilter = filters.name
          ? item.name.includes(filters.name)
          : true

        return nameFilter
      })
      .slice((page - 1) * limit, page * limit)
  }

  async count(filters: SearchManyCompaniesFilters): Promise<number> {
    return this.items.filter((item) => {
      const nameFilter = filters.name ? item.name.includes(filters.name) : true

      return nameFilter
    }).length
  }

  async findById(companyId: number): Promise<Company | null> {
    const company = this.items.find((item) => item.id === companyId)

    if (!company) {
      return null
    }

    return company
  }
}
