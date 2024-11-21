import { PrismaService } from '@/infra/prisma-service'
import { PrismaVehiclesRepository } from '@/infra/database/repositories/prisma-vehicles-repository'
import { FetchDriverVehiclesController } from '../fetch-driver-vehicles'
import { FetchDriverVehiclesUseCase } from '@/core/usecases/fetch-driver-vehicles'
import { PrismaDriversRepository } from '@/infra/database/repositories/prisma-drivers-respository'

export function makeFetchDriverVehiclesController() {
  const prismaService = new PrismaService()
  const driversRepository = new PrismaDriversRepository(prismaService)
  const vehiclesRepository = new PrismaVehiclesRepository(prismaService)
  const createCompanyUseCase = new FetchDriverVehiclesUseCase(
    driversRepository,
    vehiclesRepository,
  )
  const fetchDriverVehiclesController = new FetchDriverVehiclesController(
    createCompanyUseCase,
  )

  return fetchDriverVehiclesController
}
