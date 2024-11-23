import { PrismaService } from '@/infra/prisma-service'
import { FetchDriversController } from '../fetch-drivers'
import { FetchDriversUseCase } from '@/core/usecases/fetch-drivers'
import { PrismaDriversRepository } from '@/infra/database/repositories/prisma-drivers-respository'

export function makeFetchDriversController() {
  const prismaService = new PrismaService()
  const driversRepository = new PrismaDriversRepository(prismaService)
  const fetchDriversUseCase = new FetchDriversUseCase(driversRepository)
  const fetchDriversController = new FetchDriversController(fetchDriversUseCase)

  return fetchDriversController
}
