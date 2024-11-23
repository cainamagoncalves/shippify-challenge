import { BadRequestError } from '@/core/errors/bad-request'
import { Request, Response } from 'express'
import { z } from 'zod'
import { FetchDriversUseCase } from '@/core/usecases/fetch-drivers'
import { CompanyPresenter } from '../presenters/company-presenter'
import { DriverPresenter } from '../presenters/driver-presenter'

const fetchDriversQueryParamsSchema = z.object({
  page: z.coerce.number(),
  limit: z.coerce.number(),
  companyId: z.coerce.number().optional(),
})

export class FetchDriversController {
  constructor(private fetchDrivers: FetchDriversUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const _queryParams = fetchDriversQueryParamsSchema.safeParse(req.query)

    if (_queryParams.success === false) {
      throw new BadRequestError(JSON.stringify(_queryParams.error))
    }

    const { limit, page, companyId } = _queryParams.data

    const { drivers, meta } = await this.fetchDrivers.execute({
      limit,
      page,
      companyId,
    })

    return res
      .status(200)
      .send({ drivers: drivers.map(DriverPresenter.toHTTP), meta })
  }
}
