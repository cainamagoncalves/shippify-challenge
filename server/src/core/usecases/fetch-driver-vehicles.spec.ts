// sum.test.js
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchDriverVehiclesUseCase } from './fetch-driver-vehicles'
import { InMemoryVehiclesRepository } from '../repositories/in-memory/in-memory-vehicles-repository'
import { VehiclesRepository } from '../repositories/vehicles-repository'
import { DriversRepository } from '../repositories/drivers-repository'
import { CompaniesRepository } from '../repositories/companies-repository'
import { InMemoryDriversRepository } from '../repositories/in-memory/in-memory-drivers-repository'
import { InMemoryCompaniesRepository } from '../repositories/in-memory/in-memory-companies-repository'
import { makeCompany } from '@/tests/factories/make-company'
import { makeDriver } from '@/tests/factories/make-driver'
import { makeVehicle } from '@/tests/factories/make-vehicle'
import { ResourceNotFoundError } from '../errors/resource-not-found'

let companiesRepository: CompaniesRepository
let vehiclesRepository: VehiclesRepository
let driversRepository: DriversRepository
let sut: FetchDriverVehiclesUseCase

describe('Fetch drivers vehicles use case', () => {
  beforeEach(async () => {
    driversRepository = new InMemoryDriversRepository()
    companiesRepository = new InMemoryCompaniesRepository()
    vehiclesRepository = new InMemoryVehiclesRepository()
    sut = new FetchDriverVehiclesUseCase(driversRepository, vehiclesRepository)
  })

  it('Should be able to fetch vehicles by driver id', async () => {
    const company = makeCompany({}, 25)

    await companiesRepository.create(company)

    const driver = makeDriver(
      {
        companyId: company.id,
      },
      1,
    )

    await driversRepository.create(driver)

    for (let i = 1; i <= 3; i++) {
      const vehicle = makeVehicle(
        {
          driverId: driver.id,
        },
        i,
      )

      await vehiclesRepository.create(vehicle)
    }

    const { vehicles, meta } = await sut.execute({
      driverId: 1,
      limit: 10,
      page: 1,
    })

    expect(vehicles).toHaveLength(3)
    expect(meta.count).toEqual(3)
  })

  it('Should not be able to fetch vehicles by a unexistent driver', async () => {
    await expect(
      sut.execute({
        driverId: 1,
        limit: 10,
        page: 1,
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
