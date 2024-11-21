import { Driver } from '@/core/entities/driver'

export class DriverPresenter {
  static toHTTP(driver: Driver) {
    return {
      id: driver.id,
      companyId: driver.companyId,
      city: driver.city,
      firstName: driver.firstName,
      lastName: driver.lastName,
      email: driver.email,
      phone: driver.phone,
      avatarUrl: driver.avatarUrl,
      status: driver.status,
      creationDate: driver.creationDate,
    }
  }
}
