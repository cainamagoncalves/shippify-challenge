import { BadRequestError } from '@/core/errors/bad-request'
import { CreateVehicleUseCase } from '@/core/usecases/create-vehicle'
import { Request, Response } from 'express'
import { z } from 'zod'

const createVehicleSchema = z.object({
  capacity: z.string(),
  model: z.string(),
  plate: z.string(),
  type: z.string(),
  driverId: z.number().optional(),
})

export class CreateVehicleController {
  constructor(private createVehicle: CreateVehicleUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { success, data, error } = createVehicleSchema.safeParse(req.body)

    if (success === false) {
      throw new BadRequestError(JSON.stringify(error))
    }

    const { capacity, type, driverId, plate, model } = data

    await this.createVehicle.execute({
      capacity,
      model,
      plate,
      type,
      driverId,
    })

    return res.status(201).send()
  }
}
