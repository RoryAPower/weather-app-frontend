import { AxiosResponse } from 'axios'
import http from '@/services/api/http'

export const getCity = (city: string): Promise<AxiosResponse> => {
  return http.get('/api/geo-location', { params: { city: city } })
}
