import { api } from '@/lib/axios'

import { Company } from './_types/company'

interface GetCompaniesResponse {
  companies: Company[]
  meta: {
    count: number
    totalPages: number
  }
}

interface GetCompaniesParams {
  page: number
  limit: number
  name?: string
}

export async function getCompanies({ limit, page, name }: GetCompaniesParams) {
  const { data } = await api.get<GetCompaniesResponse>('/companies', {
    params: {
      page,
      limit,
      name,
    },
  })

  return data
}
