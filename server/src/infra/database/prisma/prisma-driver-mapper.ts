import { Driver } from '@/core/entities/driver'
import { Prisma, Driver as PrismaDriver } from '@prisma/client'

export class PrismaDriverMapper {
  static toDomain(raw: PrismaDriver): Driver {
    return Driver.create(
      {
        city: raw.city,
        email: raw.email,
        firstName: raw.firstName,
        phone: raw.phone,
        avatarUrl: raw.avatarUrl,
        companyId: raw.companyId,
        lastName: raw.lastName,
        status: raw.status,
        creationDate: raw.creationDate,
      },
      raw.id,
    )
  }

  static toPersistence(driver: Driver): Prisma.DriverUncheckedCreateInput {
    return {
      id: driver.id,
      city: driver.city,
      email: driver.email,
      firstName: driver.firstName,
      lastName: driver.lastName,
      phone: driver.phone,
      avatarUrl: driver.avatarUrl,
      companyId: driver.companyId,
      status: driver.status,
      creationDate: driver.creationDate,
    }
  }
}
