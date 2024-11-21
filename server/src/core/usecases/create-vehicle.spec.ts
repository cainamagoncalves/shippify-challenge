// sum.test.js
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateVehicleUseCase } from './create-vehicle'
import { VehiclesRepository } from '../repositories/vehicles-repository'
import { InMemoryVehiclesRepository } from '../repositories/in-memory/in-memory-vehicles-repository'

let vehiclesRepository: VehiclesRepository
let sut: CreateVehicleUseCase

describe('Create vehicle use case', () => {
  beforeEach(async () => {
    vehiclesRepository = new InMemoryVehiclesRepository()
    sut = new CreateVehicleUseCase(vehiclesRepository)
  })

  it('Should be able to create a vehicle', async () => {
    const { vehicle } = await sut.execute({
      capacity: '2',
      plate: 'ABC1234',
      model: 'Fox',
      type: 'Sedan',
    })

    expect(vehicle.id).toBeDefined()
    expect(vehicle.id).toEqual(expect.any(Number))
  })
})
