import { Router } from 'express'
import { makeCreateDriverController } from '../controllers/factories/make-create-driver-controller'
import { makeFetchDriverVehiclesController } from '../controllers/factories/make-fetch-driver-vehicles-controller'

const driversRoutes = Router()

const createDriverController = makeCreateDriverController()
const fetchDriverVehiclesController = makeFetchDriverVehiclesController()

driversRoutes.get('/:driverId/vehicles', async (req, res) => {
  await fetchDriverVehiclesController.handle(req, res)
})

driversRoutes.post('/', async (req, res) => {
  await createDriverController.handle(req, res)
})

export { driversRoutes }
