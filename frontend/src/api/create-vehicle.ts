import { api } from '@/lib/axios'

interface CreateVehicleBody {
  driverId: number
  plate: string
  capacity: string
  type: string
  model: string
}

interface CreateVehicleParams {
  body: CreateVehicleBody
}

export async function createVehicle({ body }: CreateVehicleParams) {
  await api.post('/vehicles', body)
}
