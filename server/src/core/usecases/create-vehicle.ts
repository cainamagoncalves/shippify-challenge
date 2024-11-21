import { Vehicle } from '../entities/vehicle'
import { VehiclesRepository } from '../repositories/vehicles-repository'

interface CreateVehicleUseCaseRequest {
  driverId?: number
  plate: string
  model: string
  type: string
  capacity: string
}

interface CreateVehicleUseCaseResponse {
  vehicle: Vehicle
}

export class CreateVehicleUseCase {
  constructor(private vehiclesRepository: VehiclesRepository) {}
  async execute({
    capacity,
    driverId,
    model,
    plate,
    type,
  }: CreateVehicleUseCaseRequest): Promise<CreateVehicleUseCaseResponse> {
    const vehicle = Vehicle.create({
      capacity,
      driverId,
      model,
      plate,
      type,
    })

    const { id } = await this.vehiclesRepository.create(vehicle)

    vehicle.id = id

    return { vehicle }
  }
}
