import { Company } from '@/core/entities/company'

export class CompanyPresenter {
  static toHTTP(company: Company) {
    return {
      id: company.id,
      name: company.name,
      city: company.city,
      status: company.status,
      planType: company.planType,
      creationDate: company.creationDate,
    }
  }
}
