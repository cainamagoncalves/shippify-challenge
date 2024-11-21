import { Company } from '../entities/company'
import { CompaniesRepository } from '../repositories/companies-repository'

interface FetchCompaniesUseCaseRequest {
  page: number
  limit: number
}

interface FetchCompaniesUseCaseResponse {
  companies: Company[]
  meta: {
    count: number
  }
}

export class FetchCompaniesUseCase {
  constructor(private companiesRepository: CompaniesRepository) {}
  async execute({
    page,
    limit,
  }: FetchCompaniesUseCaseRequest): Promise<FetchCompaniesUseCaseResponse> {
    const companies = await this.companiesRepository.searchMany(page, limit)

    const count = await this.companiesRepository.count()

    return { companies, meta: { count } }
  }
}
