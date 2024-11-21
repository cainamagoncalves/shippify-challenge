import { Vehicle } from '../entities/vehicle'

export interface VehiclesRepository {
  create(data: Vehicle): Promise<Vehicle>
  findManyByDriver(
    page: number,
    limit: number,
    driverId: number,
  ): Promise<Vehicle[]>
  countByDriverId(driverId: number): Promise<number>
}
