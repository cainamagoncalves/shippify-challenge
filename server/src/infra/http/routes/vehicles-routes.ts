import { Router } from 'express'
import { makeCreateVehicleController } from '../controllers/factories/make-create-vehicle-controller'

const vehiclesRoutes = Router()

const createVehicleController = makeCreateVehicleController()

vehiclesRoutes.post('/', async (req, res) => {
  await createVehicleController.handle(req, res)
})

export { vehiclesRoutes }
