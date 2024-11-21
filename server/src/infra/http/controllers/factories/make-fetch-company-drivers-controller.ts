import { PrismaService } from '@/infra/prisma-service'
import { PrismaDriversRepository } from '@/infra/database/repositories/prisma-drivers-respository'
import { FetchCompanyDriversUseCase } from '@/core/usecases/fetch-company-drivers'
import { FetchCompanyDriversController } from '../fetch-company-drivers'
import { PrismaCompaniesRepository } from '@/infra/database/repositories/prisma-companies-repository'

export function makeFetchCompanyDriversController() {
  const prismaService = new PrismaService()
  const companiesRepository = new PrismaCompaniesRepository(prismaService)
  const driversRepository = new PrismaDriversRepository(prismaService)
  const createCompanyUseCase = new FetchCompanyDriversUseCase(
    companiesRepository,
    driversRepository,
  )
  const fetchCompanyDriversController = new FetchCompanyDriversController(
    createCompanyUseCase,
  )

  return fetchCompanyDriversController
}
