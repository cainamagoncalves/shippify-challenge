import { Vehicle } from '@/core/entities/vehicle'
import { Prisma, Vehicle as PrismaVehicle } from '@prisma/client'

export class PrismaVehicleMapper {
  static toDomain(raw: PrismaVehicle): Vehicle {
    return Vehicle.create(
      {
        capacity: raw.capacity,
        model: raw.model,
        plate: raw.plate,
        type: raw.type,
        driverId: raw.driverId,
        creationDate: raw.creationDate,
      },
      raw.id,
    )
  }

  static toPersistence(vehicle: Vehicle): Prisma.VehicleUncheckedCreateInput {
    return {
      id: vehicle.id,
      capacity: vehicle.capacity,
      model: vehicle.model,
      plate: vehicle.plate,
      type: vehicle.type,
      driverId: vehicle.driverId,
      creationDate: vehicle.creationDate,
    }
  }
}
