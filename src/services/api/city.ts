import { AxiosResponse } from 'axios'
import http from '@/services/api/http'
import { City, CityResponse } from '@/interfaces/weather'

export const createCity = async (city: City): Promise<AxiosResponse> => {
  return http.post<CityResponse>('/api/city', city)
}
