import { AxiosResponse } from 'axios'
import http from '@/services/api/http'

import { CitiesResponse } from '@/interfaces/city'

export const getCity = (city: string): Promise<AxiosResponse> => {
  return http.get<CitiesResponse>('/api/geo-location', { params: { city: city } })
}
