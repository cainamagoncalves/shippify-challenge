import { VehiclesRepository } from '@/core/repositories/vehicles-repository'
import { PrismaService } from '@/infra/prisma-service'
import { Vehicle } from '@/core/entities/vehicle'
import { PrismaVehicleMapper } from '../prisma/prisma-vehicle-mapper'

export class PrismaVehiclesRepository implements VehiclesRepository {
  constructor(private prismaService: PrismaService) {}

  async create(vehicle: Vehicle): Promise<Vehicle> {
    const data = PrismaVehicleMapper.toPersistence(vehicle)

    await this.prismaService.vehicle.create({
      data,
    })

    return vehicle
  }

  async countByDriverId(driverId: number): Promise<number> {
    const count = await this.prismaService.vehicle.count({
      where: {
        driverId,
      },
    })

    return count
  }

  async findManyByDriver(
    page: number,
    limit: number,
    driverId: number,
  ): Promise<Vehicle[]> {
    const vehicles = await this.prismaService.vehicle.findMany({
      skip: (page - 1) * limit,
      take: page * limit,
      where: {
        driverId,
      },
    })

    return vehicles.map(PrismaVehicleMapper.toDomain)
  }
}
