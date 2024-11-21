// sum.test.js
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateDriverUseCase } from './create-driver'
import { DriversRepository } from '../repositories/drivers-repository'
import { InMemoryDriversRepository } from '../repositories/in-memory/in-memory-drivers-repository'
import { makeDriver } from '@/tests/factories/make-driver'
import { BadRequestError } from '../errors/bad-request'

let driversRepository: DriversRepository
let sut: CreateDriverUseCase

describe('Create driver use case', () => {
  beforeEach(async () => {
    driversRepository = new InMemoryDriversRepository()
    sut = new CreateDriverUseCase(driversRepository)
  })

  it('Should be able to create a driver', async () => {
    const { driver } = await sut.execute({
      companyId: 1,
      email: 'jhondoe@email.com',
      firstName: 'Jhon',
      phone: '(12)98100-0000',
      status: 'requested',
      lastName: 'Doe',
      city: 1,
    })

    expect(driver.id).toBeDefined()
    expect(driver.id).toEqual(expect.any(Number))
  })

  it('Should not be able to create a driver with existent email', async () => {
    const driver = makeDriver()

    await driversRepository.create(driver)

    await expect(
      sut.execute({
        companyId: 1,
        email: 'jhondoe@email.com',
        firstName: 'Jhon',
        phone: '(12)98100-0000',
        status: 'requested',
        lastName: 'Doe',
        city: 1,
      }),
    ).rejects.toBeInstanceOf(BadRequestError)
  })
})
