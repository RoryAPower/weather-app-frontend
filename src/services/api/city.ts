import { AxiosResponse } from 'axios'
import http from '@/services/api/http'
import { City, CityResponse } from '@/interfaces/city'

export const createCity = async (city: City): Promise<AxiosResponse> => {
  return http.post<CityResponse>('/api/city', city)
}
