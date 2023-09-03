import { AxiosResponse } from 'axios'
import http from '@/services/api/http'
import { UserResponse } from '@/interfaces/user'

export const getUserDetails = (): Promise<AxiosResponse> => {
  return http.get<UserResponse>('/api/my-details')
}
