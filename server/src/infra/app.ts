import 'express-async-errors'
import express from 'express'
import { errorMiddleware } from './http/middlewares/error'
import { router } from './http/routes'

const app = express()

app.use(express.json())

app.use(router)

app.use(errorMiddleware)

export { app }
