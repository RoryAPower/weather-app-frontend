import { AxiosResponse } from 'axios'
import http from '@/services/api/http'

export const getUserDetails = (): Promise<AxiosResponse> => {
  return http.get('/api/my-details')
}
