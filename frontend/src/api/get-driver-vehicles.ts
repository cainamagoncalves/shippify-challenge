import { api } from '@/lib/axios'

import { Vehicle } from './_types/vehicle'

interface GetDriverVehiclesResponse {
  vehicles: Vehicle[]
  meta: {
    count: number
    totalPages: number
  }
}

interface GetDriverVehiclesParams {
  page: number
  limit: number
  driverId: number
}

export async function getDriverVehicles({
  limit,
  page,
  driverId,
}: GetDriverVehiclesParams) {
  const { data } = await api.get<GetDriverVehiclesResponse>(
    `/drivers/${driverId}/vehicles`,
    {
      params: {
        page,
        limit,
      },
    },
  )

  return data
}
