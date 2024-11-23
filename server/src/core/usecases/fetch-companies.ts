import { Company } from '../entities/company'
import { CompaniesRepository } from '../repositories/companies-repository'

interface FetchCompaniesUseCaseRequest {
  page: number
  limit: number
  name?: string
}

interface FetchCompaniesUseCaseResponse {
  companies: Company[]
  meta: {
    count: number
    totalPages: number
  }
}

export class FetchCompaniesUseCase {
  constructor(private companiesRepository: CompaniesRepository) {}
  async execute({
    page,
    limit,
    name,
  }: FetchCompaniesUseCaseRequest): Promise<FetchCompaniesUseCaseResponse> {
    const companies = await this.companiesRepository.searchMany(page, limit, {
      name,
    })

    const count = await this.companiesRepository.count({ name })

    return { companies, meta: { count, totalPages: Math.ceil(count / limit) } }
  }
}
