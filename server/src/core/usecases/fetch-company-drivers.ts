import { Driver } from '../entities/driver'
import { ResourceNotFoundError } from '../errors/resource-not-found'
import { CompaniesRepository } from '../repositories/companies-repository'
import { DriversRepository } from '../repositories/drivers-repository'

interface FetchCompanyDriversUseCaseRequest {
  page: number
  limit: number
  companyId: number
}

interface FetchCompanyDriversUseCaseResponse {
  drivers: Driver[]
  meta: {
    count: number
  }
}

export class FetchCompanyDriversUseCase {
  constructor(
    private companiesRepository: CompaniesRepository,
    private driversRepository: DriversRepository,
  ) {}

  async execute({
    page,
    limit,
    companyId,
  }: FetchCompanyDriversUseCaseRequest): Promise<FetchCompanyDriversUseCaseResponse> {
    const company = await this.companiesRepository.findById(companyId)

    if (!company) {
      throw new ResourceNotFoundError('Company not found!')
    }

    const drivers = await this.driversRepository.findManyByCompany(
      page,
      limit,
      companyId,
    )

    const count = await this.driversRepository.countByCompany(companyId)

    return { drivers, meta: { count } }
  }
}
