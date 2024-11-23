export interface Driver {
  id: number
  companyId: number
  firstName: string
  lastName: string | null
  email: string
  city: number | null
  phone: string
  status: string
  avatarUrl: string | null
  creationDate: string | null
}
