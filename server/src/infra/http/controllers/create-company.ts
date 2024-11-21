import { BadRequestError } from '@/core/errors/bad-request'
import { CreateCompanyUseCase } from '@/core/usecases/create-company'
import { Request, Response } from 'express'
import { z } from 'zod'

const createCompanySchema = z.object({
  city: z.number(),
  name: z.string(),
  planType: z.string(),
  status: z.string(),
})

export class CreateCompanyController {
  constructor(private createCompany: CreateCompanyUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { success, data } = createCompanySchema.safeParse(req.body)

    if (success === false) {
      throw new BadRequestError('Validation error')
    }

    const { city, name, planType, status } = data

    await this.createCompany.execute({
      city,
      name,
      planType,
      status,
    })

    return res.status(201).send()
  }
}
