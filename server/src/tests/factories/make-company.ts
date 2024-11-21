import { Company, CompanyProps } from '@/core/entities/company'

export function makeCompany(override: Partial<CompanyProps> = {}, id?: number) {
  const company = Company.create(
    {
      city: 1,
      name: 'Company 1',
      planType: 'Standard',
      status: 'active',
      ...override,
    },
    id,
  )

  return company
}
