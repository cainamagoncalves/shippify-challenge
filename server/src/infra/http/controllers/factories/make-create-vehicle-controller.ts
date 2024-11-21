import { PrismaService } from '@/infra/prisma-service'
import { CreateVehicleUseCase } from '@/core/usecases/create-vehicle'
import { CreateVehicleController } from '../create-vehicle'
import { PrismaVehiclesRepository } from '@/infra/database/repositories/prisma-vehicles-repository'

export function makeCreateVehicleController() {
  const prismaService = new PrismaService()
  const vehiclesRepository = new PrismaVehiclesRepository(prismaService)
  const createCompanyUseCase = new CreateVehicleUseCase(vehiclesRepository)
  const createVehicleController = new CreateVehicleController(
    createCompanyUseCase,
  )

  return createVehicleController
}
