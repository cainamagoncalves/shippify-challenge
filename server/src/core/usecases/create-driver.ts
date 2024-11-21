import { Driver } from '../entities/driver'
import { BadRequestError } from '../errors/bad-request'
import { DriversRepository } from '../repositories/drivers-repository'

interface CreateDriverUseCaseRequest {
  city?: number
  avatarUrl?: string
  companyId?: number
  firstName: string
  lastName?: string
  email: string
  phone: string
  status: string
}

interface CreateDriverUseCaseResponse {
  driver: Driver
}

export class CreateDriverUseCase {
  constructor(private driversRepository: DriversRepository) {}
  async execute({
    city,
    email,
    firstName,
    phone,
    status,
    avatarUrl,
    companyId,
    lastName,
  }: CreateDriverUseCaseRequest): Promise<CreateDriverUseCaseResponse> {
    const alreadyExistsDriverByEmail =
      await this.driversRepository.findByEmail(email)

    if (alreadyExistsDriverByEmail) {
      throw new BadRequestError('Driver with informed email already exists')
    }

    const driver = Driver.create({
      city,
      email,
      firstName,
      phone,
      status,
      avatarUrl,
      companyId,
      lastName,
    })

    const { id } = await this.driversRepository.create(driver)

    driver.id = id

    return { driver }
  }
}
