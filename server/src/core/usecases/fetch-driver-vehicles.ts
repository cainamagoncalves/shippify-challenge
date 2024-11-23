import { Vehicle } from '../entities/vehicle'
import { ResourceNotFoundError } from '../errors/resource-not-found'
import { DriversRepository } from '../repositories/drivers-repository'
import { VehiclesRepository } from '../repositories/vehicles-repository'

interface FetchDriverVehiclesUseCaseRequest {
  page: number
  limit: number
  driverId: number
}

interface FetchDriverVehiclesUseCaseResponse {
  vehicles: Vehicle[]
  meta: {
    count: number
    totalPages: number
  }
}

export class FetchDriverVehiclesUseCase {
  constructor(
    private driversRepository: DriversRepository,
    private vehiclesRepository: VehiclesRepository,
  ) {}

  async execute({
    page,
    limit,
    driverId,
  }: FetchDriverVehiclesUseCaseRequest): Promise<FetchDriverVehiclesUseCaseResponse> {
    const driver = await this.driversRepository.findById(driverId)

    if (!driver) {
      throw new ResourceNotFoundError('Driver not found!')
    }

    const vehicles = await this.vehiclesRepository.findManyByDriver(
      page,
      limit,
      driverId,
    )

    const count = await this.vehiclesRepository.countByDriverId(driverId)

    return { vehicles, meta: { count, totalPages: Math.ceil(count / limit) } }
  }
}
