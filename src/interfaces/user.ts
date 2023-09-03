import { City } from '@/interfaces/weather'

export interface User {
  id: string
  name: string
  email: string
  cities: City[]
}

export interface UserResponse {
  data: User
}
