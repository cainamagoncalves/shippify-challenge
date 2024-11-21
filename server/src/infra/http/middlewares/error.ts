import { BadRequestError } from '@/core/errors/bad-request'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found'
import {
  NextFunction,
  Request as ExpressRequest,
  Response as ExpressResponse,
} from 'express'

export const errorMiddleware = (
  err: unknown,
  req: ExpressRequest,
  res: ExpressResponse,
  next: NextFunction,
) => {
  console.error('Error', err)

  if (err instanceof ResourceNotFoundError) {
    res.status(err.statusCode).json({ message: err.message })
    return
  }

  if (err instanceof BadRequestError) {
    res.status(err.statusCode).json({ message: err.message })
    return
  }

  return res.status(500).json({ message: 'Internal error' })
}
