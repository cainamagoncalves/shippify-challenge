import { Company } from '../entities/company'
import { BadRequestError } from '../errors/bad-request'
import { CompaniesRepository } from '../repositories/companies-repository'

interface CreateCompanyUseCaseRequest {
  city: number
  name: string
  planType: string
  status: string
}

interface CreateCompanyUseCaseResponse {
  company: Company
}

export class CreateCompanyUseCase {
  constructor(private companiesRepository: CompaniesRepository) {}
  async execute({
    city,
    name,
    planType,
    status,
  }: CreateCompanyUseCaseRequest): Promise<CreateCompanyUseCaseResponse> {
    const companyExists = await this.companiesRepository.findByName(name)

    if (companyExists) {
      throw new BadRequestError('Company already exists')
    }

    const company = Company.create({
      city,
      name,
      planType,
      status,
    })

    const { id } = await this.companiesRepository.create(company)

    company.id = id

    return { company }
  }
}
