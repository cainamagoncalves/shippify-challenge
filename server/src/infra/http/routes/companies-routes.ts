import { Router } from 'express'
import { makeCreateCompanyController } from '../controllers/factories/make-create-company-controller'
import { makeFetchCompaniesController } from '../controllers/factories/make-fetch-companies-controller'
import { makeFetchCompanyDriversController } from '../controllers/factories/make-fetch-company-drivers-controller'

const companiesRoutes = Router()

const createCompanyController = makeCreateCompanyController()
const fetchCompaniesController = makeFetchCompaniesController()
const fetchCompanyDriversController = makeFetchCompanyDriversController()

companiesRoutes.get('/', async (req, res) => {
  await fetchCompaniesController.handle(req, res)
})
companiesRoutes.get('/:companyId/drivers', async (req, res) => {
  await fetchCompanyDriversController.handle(req, res)
})

companiesRoutes.post('/', async (req, res) => {
  await createCompanyController.handle(req, res)
})

export { companiesRoutes }
