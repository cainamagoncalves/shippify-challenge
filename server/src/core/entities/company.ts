import { Optional } from '../types/optional'
import { Entity } from './entity'

export interface CompanyProps {
  name: string
  city: number
  status: string
  planType: string
  creationDate?: Date | null
}

export class Company extends Entity<CompanyProps> {
  get name() {
    return this.props.name
  }

  get city() {
    return this.props.city
  }

  get status() {
    return this.props.status
  }

  get planType() {
    return this.props.planType
  }

  get creationDate() {
    return this.props.creationDate
  }

  static create(props: Optional<CompanyProps, 'creationDate'>, id?: number) {
    const company = new Company(
      {
        ...props,
        creationDate: props.creationDate ?? new Date(),
      },
      id,
    )

    return company
  }
}
