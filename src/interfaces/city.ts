export interface City {
  id?: string
  name: string
  lat: number
  long: number
  country?: string
  state?: string
}

export interface CitiesResponse {
  data: City[]
}

export interface CityResponse {
  data: City
}
