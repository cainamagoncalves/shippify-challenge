import { BadRequestError } from '@/core/errors/bad-request'
import { FetchDriverVehiclesUseCase } from '@/core/usecases/fetch-driver-vehicles'
import { Request, Response } from 'express'
import { z } from 'zod'
import { VehiclePresenter } from '../presenters/vehicle-presenter'

const fetchDriverVehiclesRouteParamsSchema = z.object({
  driverId: z.coerce.number(),
})

const fetchDriverVehiclesQueryParamsSchema = z.object({
  page: z.coerce.number(),
  limit: z.coerce.number(),
})

export class FetchDriverVehiclesController {
  constructor(private fetchDriverVehicles: FetchDriverVehiclesUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const _routeParams = fetchDriverVehiclesRouteParamsSchema.safeParse(
      req.params,
    )

    if (_routeParams.success === false) {
      throw new BadRequestError(JSON.stringify(_routeParams.error))
    }

    const { driverId } = _routeParams.data

    const _queryParams = fetchDriverVehiclesQueryParamsSchema.safeParse(
      req.query,
    )

    if (_queryParams.success === false) {
      throw new BadRequestError(JSON.stringify(_queryParams.error))
    }

    const { limit, page } = _queryParams.data

    const { vehicles, meta } = await this.fetchDriverVehicles.execute({
      driverId,
      limit,
      page,
    })

    return res
      .status(200)
      .send({ vehicles: vehicles.map(VehiclePresenter.toHTTP), meta })
  }
}
