import { beforeEach, describe, expect, it } from 'vitest'
import { DriversRepository } from '../repositories/drivers-repository'
import { CompaniesRepository } from '../repositories/companies-repository'
import { InMemoryDriversRepository } from '../repositories/in-memory/in-memory-drivers-repository'
import { InMemoryCompaniesRepository } from '../repositories/in-memory/in-memory-companies-repository'
import { makeCompany } from '@/tests/factories/make-company'
import { makeDriver } from '@/tests/factories/make-driver'
import { ResourceNotFoundError } from '../errors/resource-not-found'
import { FetchCompanyDriversUseCase } from './fetch-company-drivers'

let companiesRepository: CompaniesRepository
let driversRepository: DriversRepository
let sut: FetchCompanyDriversUseCase

describe('Fetch company drivers use case', () => {
  beforeEach(async () => {
    driversRepository = new InMemoryDriversRepository()
    companiesRepository = new InMemoryCompaniesRepository()
    sut = new FetchCompanyDriversUseCase(companiesRepository, driversRepository)
  })

  it('Should be able to fetch drivers by company id', async () => {
    const company = makeCompany({}, 1)

    await companiesRepository.create(company)

    for (let i = 1; i <= 22; i++) {
      const driver = makeDriver(
        {
          companyId: company.id,
        },
        i,
      )

      await driversRepository.create(driver)
    }

    const { drivers, meta } = await sut.execute({
      companyId: 1,
      limit: 10,
      page: 3,
    })

    expect(drivers).toHaveLength(2)
    expect(meta.count).toEqual(22)
  })

  it('Should not be able to fetch drivers by a unexistent company', async () => {
    await expect(
      sut.execute({
        companyId: 1,
        limit: 10,
        page: 1,
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
