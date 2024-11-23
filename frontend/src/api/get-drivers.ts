import { api } from '@/lib/axios'

import { Driver } from './_types/driver'

interface GetDriversResponse {
  drivers: Driver[]
  meta: {
    count: number
    totalPages: number
  }
}

interface GetDriversParams {
  page: number
  limit: number
  companyId?: number
}

export async function getDrivers({ limit, page, companyId }: GetDriversParams) {
  const { data } = await api.get<GetDriversResponse>(`/drivers`, {
    params: {
      page,
      limit,
      companyId,
    },
  })

  return data
}
