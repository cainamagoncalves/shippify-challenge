import { Vehicle } from '@/core/entities/vehicle'
import { VehiclesRepository } from '../vehicles-repository'

export class InMemoryVehiclesRepository implements VehiclesRepository {
  public items: Vehicle[] = []

  async create(data: Vehicle): Promise<Vehicle> {
    this.items.push(data)

    return data
  }

  async findManyByDriver(
    page: number,
    limit: number,
    driverId: number,
  ): Promise<Vehicle[]> {
    const vehicles = this.items
      .filter((item) => item.driverId === driverId)
      .slice((page - 1) * limit, page * limit)

    return vehicles
  }

  async countByDriverId(driverId: number): Promise<number> {
    return this.items.filter((item) => item.driverId === driverId).length
  }
}
