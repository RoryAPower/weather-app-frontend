import { AxiosResponse } from 'axios'
import http from '@/services/api/http'
import { WeatherResponse } from '@/interfaces/weather'

export const getWeather = (lat: number, long: number): Promise<AxiosResponse> => {
  return http.get<WeatherResponse>('/api/weather', { params: { lat: lat, long: long } })
}
