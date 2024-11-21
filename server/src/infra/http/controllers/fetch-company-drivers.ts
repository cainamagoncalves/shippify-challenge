import { BadRequestError } from '@/core/errors/bad-request'
import { Request, Response } from 'express'
import { z } from 'zod'
import { FetchCompanyDriversUseCase } from '@/core/usecases/fetch-company-drivers'
import { DriverPresenter } from '../presenters/driver-presenter'

const fetchCompanyDriversRouteParamsSchema = z.object({
  companyId: z.coerce.number(),
})

const fetchCompanyDriversQueryParamsSchema = z.object({
  page: z.coerce.number(),
  limit: z.coerce.number(),
})

export class FetchCompanyDriversController {
  constructor(private fetchCompanyDrivers: FetchCompanyDriversUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const _routeParams = fetchCompanyDriversRouteParamsSchema.safeParse(
      req.params,
    )

    if (_routeParams.success === false) {
      throw new BadRequestError(JSON.stringify(_routeParams.error))
    }

    const { companyId } = _routeParams.data

    const _queryParams = fetchCompanyDriversQueryParamsSchema.safeParse(
      req.query,
    )

    if (_queryParams.success === false) {
      throw new BadRequestError(JSON.stringify(_queryParams.error))
    }

    const { limit, page } = _queryParams.data

    const { drivers, meta } = await this.fetchCompanyDrivers.execute({
      companyId,
      limit,
      page,
    })

    return res
      .status(200)
      .send({ drivers: drivers.map(DriverPresenter.toHTTP), meta })
  }
}
