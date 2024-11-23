// sum.test.js
import { beforeEach, describe, expect, it } from 'vitest'
import { DriversRepository } from '../repositories/drivers-repository'
import { CompaniesRepository } from '../repositories/companies-repository'
import { InMemoryDriversRepository } from '../repositories/in-memory/in-memory-drivers-repository'
import { InMemoryCompaniesRepository } from '../repositories/in-memory/in-memory-companies-repository'
import { makeCompany } from '@/tests/factories/make-company'
import { makeDriver } from '@/tests/factories/make-driver'
import { FetchDriversUseCase } from './fetch-drivers'

let companiesRepository: CompaniesRepository
let driversRepository: DriversRepository
let sut: FetchDriversUseCase

describe('Fetch drivers use case', () => {
  beforeEach(async () => {
    driversRepository = new InMemoryDriversRepository()
    companiesRepository = new InMemoryCompaniesRepository()
    sut = new FetchDriversUseCase(driversRepository)
  })

  it('Should be able to fetch drivers', async () => {
    for (let i = 1; i <= 22; i++) {
      const driver = makeDriver({}, i)

      await driversRepository.create(driver)
    }

    const { drivers, meta } = await sut.execute({
      limit: 10,
      page: 3,
    })

    expect(drivers).toHaveLength(2)
    expect(meta.count).toEqual(22)
  })

  it('Should be able to fetch drivers by company id', async () => {
    const company = makeCompany({}, 25)

    await companiesRepository.create(company)

    for (let i = 1; i <= 5; i++) {
      const driver = makeDriver(
        {
          companyId: company.id,
        },
        i,
      )

      await driversRepository.create(driver)
    }

    for (let i = 1; i <= 12; i++) {
      const driver = makeDriver({}, i)

      await driversRepository.create(driver)
    }

    const { drivers, meta } = await sut.execute({
      limit: 10,
      page: 1,
      companyId: company.id,
    })

    expect(drivers).toHaveLength(5)
    expect(meta.count).toEqual(5)
  })
})
