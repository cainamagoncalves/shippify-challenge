import { BadRequestError } from '@/core/errors/bad-request'
import { CreateDriverUseCase } from '@/core/usecases/create-driver'
import { Request, Response } from 'express'
import { z } from 'zod'

const createDriverSchema = z.object({
  email: z.string().max(100),
  firstName: z.string().max(100),
  lastName: z.string().optional(),
  phone: z.string().max(20),
  status: z.string().max(20),
  companyId: z.number().optional(),
  avatarUrl: z.string().optional(),
})

export class CreateDriverController {
  constructor(private createDriver: CreateDriverUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { success, data } = createDriverSchema.safeParse(req.body)

    if (success === false) {
      throw new BadRequestError('Validation error')
    }

    const { companyId, email, firstName, phone, status, avatarUrl, lastName } =
      data

    await this.createDriver.execute({
      companyId,
      email,
      firstName,
      phone,
      status,
      avatarUrl,
      lastName,
    })

    return res.status(201).send()
  }
}
