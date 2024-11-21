import { PrismaCompaniesRepository } from '@/infra/database/repositories/prisma-companies-repository'
import { PrismaService } from '@/infra/prisma-service'
import { FetchCompaniesController } from '../fetch-companies'
import { FetchCompaniesUseCase } from '@/core/usecases/fetch-companies'

export function makeFetchCompaniesController() {
  const prismaService = new PrismaService()
  const companiesRepository = new PrismaCompaniesRepository(prismaService)
  const fetchCompaniesUseCase = new FetchCompaniesUseCase(companiesRepository)
  const fetchCompaniesController = new FetchCompaniesController(
    fetchCompaniesUseCase,
  )

  return fetchCompaniesController
}
