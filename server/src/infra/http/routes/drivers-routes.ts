import { Router } from 'express'
import { makeCreateDriverController } from '../controllers/factories/make-create-driver-controller'
import { makeFetchDriverVehiclesController } from '../controllers/factories/make-fetch-driver-vehicles-controller'
import { makeFetchDriversController } from '../controllers/factories/make-fetch-drivers-controller'

const driversRoutes = Router()

const createDriverController = makeCreateDriverController()
const fetchDriverVehiclesController = makeFetchDriverVehiclesController()
const fetchDriversController = makeFetchDriversController()

driversRoutes.get('/:driverId/vehicles', async (req, res) => {
  await fetchDriverVehiclesController.handle(req, res)
})

driversRoutes.get('/', async (req, res) => {
  await fetchDriversController.handle(req, res)
})
driversRoutes.post('/', async (req, res) => {
  await createDriverController.handle(req, res)
})

export { driversRoutes }
