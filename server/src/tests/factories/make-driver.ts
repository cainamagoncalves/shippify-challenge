import { Driver, DriverProps } from '@/core/entities/driver'

export function makeDriver(override: Partial<DriverProps> = {}, id?: number) {
  const driver = Driver.create(
    {
      email: 'jhondoe@email.com',
      firstName: 'Jhon',
      phone: '(12)98111-0000',
      status: 'active',
      ...override,
    },
    id,
  )

  return driver
}
