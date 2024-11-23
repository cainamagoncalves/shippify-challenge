import { Driver } from '../entities/driver'
import { DriversRepository } from '../repositories/drivers-repository'

interface FetchDriversUseCaseRequest {
  page: number
  limit: number
  companyId?: number
}

interface FetchDriversUseCaseResponse {
  drivers: Driver[]
  meta: {
    count: number
  }
}

export class FetchDriversUseCase {
  constructor(private driversRepository: DriversRepository) {}

  async execute({
    page,
    limit,
    companyId,
  }: FetchDriversUseCaseRequest): Promise<FetchDriversUseCaseResponse> {
    const drivers = await this.driversRepository.searchMany(page, limit, {
      companyId,
    })

    const count = await this.driversRepository.count({ companyId })

    return { drivers, meta: { count } }
  }
}
