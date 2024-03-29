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
