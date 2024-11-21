import { Vehicle } from '@/core/entities/vehicle'

export class VehiclePresenter {
  static toHTTP(vehicle: Vehicle) {
    return {
      id: vehicle.id,
      plate: vehicle.plate,
      model: vehicle.model,
      type: vehicle.type,
      capacity: vehicle.capacity,
      creationDate: vehicle.creationDate,
    }
  }
}
