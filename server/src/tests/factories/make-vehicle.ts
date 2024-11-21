import { Vehicle, VehicleProps } from '@/core/entities/vehicle'

export function makeVehicle(override: Partial<VehicleProps> = {}, id?: number) {
  const vehicle = Vehicle.create(
    {
      ...override,
      capacity: '1,5t',
      model: 'Model 1',
      plate: 'ABC1234',
      type: 'Sedan',
    },
    id,
  )

  return vehicle
}
