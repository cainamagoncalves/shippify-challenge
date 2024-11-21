import { Company } from '@/core/entities/company'
import { CompaniesRepository } from '@/core/repositories/companies-repository'
import { PrismaCompanyMapper } from '../prisma/prisma-company-mapper'
import { PrismaService } from '@/infra/prisma-service'

export class PrismaCompaniesRepository implements CompaniesRepository {
  constructor(private prismaService: PrismaService) {}

  async create(company: Company): Promise<Company> {
    const data = PrismaCompanyMapper.toPersistence(company)

    await this.prismaService.company.create({
      data,
    })

    return company
  }

  async findByName(name: string): Promise<Company | null> {
    const company = await this.prismaService.company.findUnique({
      where: { name },
    })

    if (!company) {
      return null
    }

    return PrismaCompanyMapper.toDomain(company)
  }

  async searchMany(page: number, limit: number): Promise<Company[]> {
    const companies = await this.prismaService.company.findMany({
      skip: (page - 1) * limit,
      take: limit,
    })

    return companies.map(PrismaCompanyMapper.toDomain)
  }

  async count(): Promise<number> {
    return this.prismaService.company.count()
  }

  async findById(companyId: number): Promise<Company | null> {
    const company = await this.prismaService.company.findUnique({
      where: { id: companyId },
    })

    if (!company) {
      return null
    }

    return PrismaCompanyMapper.toDomain(company)
  }
}
