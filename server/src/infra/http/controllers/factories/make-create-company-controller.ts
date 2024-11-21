import { CreateCompanyUseCase } from '@/core/usecases/create-company'
import { CreateCompanyController } from '../create-company'
import { PrismaCompaniesRepository } from '@/infra/database/repositories/prisma-companies-repository'
import { PrismaService } from '@/infra/prisma-service'

export function makeCreateCompanyController() {
  const prismaService = new PrismaService()
  const companiesRepository = new PrismaCompaniesRepository(prismaService)
  const createCompanyUseCase = new CreateCompanyUseCase(companiesRepository)
  const createCompanyController = new CreateCompanyController(
    createCompanyUseCase,
  )

  return createCompanyController
}
