import { PrismaService } from '@/infra/prisma-service'
import { PrismaDriversRepository } from '@/infra/database/repositories/prisma-drivers-respository'
import { CreateDriverUseCase } from '@/core/usecases/create-driver'
import { CreateDriverController } from '../create-driver'

export function makeCreateDriverController() {
  const prismaService = new PrismaService()
  const driversRepository = new PrismaDriversRepository(prismaService)
  const createCompanyUseCase = new CreateDriverUseCase(driversRepository)
  const createDriverController = new CreateDriverController(
    createCompanyUseCase,
  )

  return createDriverController
}
