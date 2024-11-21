// sum.test.js
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateCompanyUseCase } from './create-company'
import { CompaniesRepository } from '../repositories/companies-repository'
import { InMemoryCompaniesRepository } from '../repositories/in-memory/in-memory-companies-repository'
import { makeCompany } from '@/tests/factories/make-company'
import { BadRequestError } from '../errors/bad-request'

let companiesRepository: CompaniesRepository
let sut: CreateCompanyUseCase

describe('Create company use case', () => {
  beforeEach(async () => {
    companiesRepository = new InMemoryCompaniesRepository()
    sut = new CreateCompanyUseCase(companiesRepository)
  })

  it('Should be able to create a company', async () => {
    const { company } = await sut.execute({
      city: 1,
      name: 'Company test',
      planType: 'Plan 1',
      status: 'active',
    })

    expect(company.id).toEqual(expect.any(Number))
  })

  it('Should not be able to create a company with existent name', async () => {
    const company = makeCompany()

    companiesRepository.create(company)

    await expect(
      sut.execute({
        city: 1,
        name: 'Company 1',
        planType: 'Plan 1',
        status: 'active',
      }),
    ).rejects.toBeInstanceOf(BadRequestError)
  })
})
