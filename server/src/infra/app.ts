import 'express-async-errors'
import express from 'express'
import { errorMiddleware } from './http/middlewares/error'
import { router } from './http/routes'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use(router)

app.use(errorMiddleware)

export { app }
