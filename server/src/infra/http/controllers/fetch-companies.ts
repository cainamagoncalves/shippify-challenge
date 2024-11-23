import { BadRequestError } from '@/core/errors/bad-request'
import { Request, Response } from 'express'
import { z } from 'zod'
import { FetchCompaniesUseCase } from '@/core/usecases/fetch-companies'
import { CompanyPresenter } from '../presenters/company-presenter'

const fetchCompaniesQueryParamsSchema = z.object({
  page: z.coerce.number(),
  limit: z.coerce.number(),
  name: z.string().optional(),
})

export class FetchCompaniesController {
  constructor(private fetchCompanies: FetchCompaniesUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const _queryParams = fetchCompaniesQueryParamsSchema.safeParse(req.query)

    if (_queryParams.success === false) {
      throw new BadRequestError(JSON.stringify(_queryParams.error))
    }

    const { limit, page, name } = _queryParams.data

    const { companies, meta } = await this.fetchCompanies.execute({
      limit,
      page,
      name,
    })

    return res
      .status(200)
      .send({ companies: companies.map(CompanyPresenter.toHTTP), meta })
  }
}
