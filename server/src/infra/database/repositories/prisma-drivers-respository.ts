import { DriversRepository } from '@/core/repositories/drivers-repository'
import { PrismaService } from '@/infra/prisma-service'
import { Driver } from '@/core/entities/driver'
import { PrismaDriverMapper } from '../prisma/prisma-driver-mapper'

export class PrismaDriversRepository implements DriversRepository {
  constructor(private prismaService: PrismaService) {}

  async create(driver: Driver): Promise<Driver> {
    const data = PrismaDriverMapper.toPersistence(driver)

    await this.prismaService.driver.create({
      data,
    })

    return driver
  }

  async findById(driverId: number): Promise<Driver | null> {
    const driver = await this.prismaService.driver.findUnique({
      where: {
        id: driverId,
      },
    })

    if (!driver) {
      return null
    }

    return PrismaDriverMapper.toDomain(driver)
  }

  async findByEmail(email: string): Promise<Driver | null> {
    const driver = await this.prismaService.driver.findUnique({
      where: {
        email,
      },
    })

    if (!driver) {
      return null
    }

    return PrismaDriverMapper.toDomain(driver)
  }

  async findManyByCompany(
    page: number,
    limit: number,
    companyId: number,
  ): Promise<Driver[]> {
    const drivers = await this.prismaService.driver.findMany({
      skip: (page - 1) * limit,
      take: page * limit,
      where: {
        companyId,
      },
    })

    return drivers.map(PrismaDriverMapper.toDomain)
  }

  async countByCompany(companyId: number): Promise<number> {
    return this.prismaService.driver.count({
      where: {
        companyId,
      },
    })
  }
}
