// sum.test.js
import { beforeEach, describe, expect, it } from 'vitest'
import { CompaniesRepository } from '../repositories/companies-repository'
import { InMemoryCompaniesRepository } from '../repositories/in-memory/in-memory-companies-repository'
import { makeCompany } from '@/tests/factories/make-company'
import { FetchCompaniesUseCase } from './fetch-companies'

let companiesRepository: CompaniesRepository
let sut: FetchCompaniesUseCase

describe('Fetch companies use case', () => {
  beforeEach(async () => {
    companiesRepository = new InMemoryCompaniesRepository()
    sut = new FetchCompaniesUseCase(companiesRepository)
  })

  it('Should be able to fetch paginated companies', async () => {
    for (let i = 1; i <= 22; i++) {
      const company = makeCompany({}, i)

      companiesRepository.create(company)
    }

    const { companies } = await sut.execute({
      page: 2,
      limit: 10,
    })

    expect(companies.length).toEqual(10)
  })
})
