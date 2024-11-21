import { Optional } from '../types/optional'
import { Entity } from './entity'

export interface DriverProps {
  companyId?: number | null
  city?: number | null
  firstName: string
  lastName?: string | null
  email: string
  phone: string
  avatarUrl?: string | null
  status: string
  creationDate?: Date | null
}

export class Driver extends Entity<DriverProps> {
  get companyId() {
    return this.props.companyId
  }

  get city() {
    return this.props.city
  }

  get firstName() {
    return this.props.firstName
  }

  get lastName() {
    return this.props.lastName
  }

  get email() {
    return this.props.email
  }

  get phone() {
    return this.props.phone
  }

  get avatarUrl() {
    return this.props.avatarUrl
  }

  get status() {
    return this.props.status
  }

  get creationDate() {
    return this.props.creationDate
  }

  static create(
    props: Optional<
      DriverProps,
      'companyId' | 'avatarUrl' | 'creationDate' | 'lastName' | 'city'
    >,
    id?: number,
  ) {
    const driver = new Driver(
      {
        ...props,
        city: props.city ?? null,
        companyId: props.companyId ?? null,
        avatarUrl: props.avatarUrl ?? null,
        lastName: props.lastName ?? null,
        creationDate: props.creationDate ?? new Date(),
      },
      id,
    )

    return driver
  }
}
