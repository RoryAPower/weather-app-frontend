export interface City {
  id?: string
  name: string
  lat: number
  long: number
  country?: string
  state?: string
}

export interface Weather {
  city: string
  weather: WeatherObject[]
}

export interface WeatherObject {
  temp: number
  feelsLike: number
  tempMin: number
  tempMax: number
  humidity: number
  icon: string
}

export interface WeatherResponse {
  data: Weather
}

export interface CitiesResponse {
  data: City[]
}

export interface CityResponse {
  data: City
}
