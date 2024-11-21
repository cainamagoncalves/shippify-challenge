import { Optional } from '../types/optional'
import { Entity } from './entity'

export interface VehicleProps {
  driverId: number | null
  plate: string
  model: string
  type: string
  capacity: string
  creationDate?: Date | null
}

export class Vehicle extends Entity<VehicleProps> {
  get driverId() {
    return this.props.driverId
  }

  get plate() {
    return this.props.plate
  }

  get model() {
    return this.props.model
  }

  get type() {
    return this.props.type
  }

  get capacity() {
    return this.props.capacity
  }

  get creationDate() {
    return this.props.creationDate
  }

  static create(
    props: Optional<VehicleProps, 'creationDate' | 'driverId'>,
    id?: number,
  ) {
    const vehicle = new Vehicle(
      {
        ...props,
        driverId: props.driverId ?? null,
        creationDate: props.creationDate ?? new Date(),
      },
      id,
    )

    return vehicle
  }
}
