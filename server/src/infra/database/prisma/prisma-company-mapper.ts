import { Company } from '@/core/entities/company'
import { Prisma, Company as PrismaCompany } from '@prisma/client'

export class PrismaCompanyMapper {
  static toDomain(raw: PrismaCompany): Company {
    return Company.create(
      {
        city: raw.city,
        name: raw.name,
        planType: raw.planType,
        status: raw.status,
        creationDate: raw.creationDate,
      },
      raw.id,
    )
  }

  static toPersistence(company: Company): Prisma.CompanyUncheckedCreateInput {
    return {
      id: company.id,
      city: company.city,
      name: company.name,
      planType: company.planType,
      status: company.status,
      creationDate: company.creationDate,
    }
  }
}
