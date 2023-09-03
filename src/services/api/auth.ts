import http from '@/services/api/http'
import { AxiosResponse } from 'axios'
import { Login } from '@/interfaces/auth'

export const initialiseSanctum = (): Promise<AxiosResponse> => {
  const sanctumUrl = `${import.meta.env.VITE_API_URL}/sanctum/csrf-cookie`

  return http.get(sanctumUrl)
}

export const login = async (credentials: Login): Promise<AxiosResponse> => {
  await initialiseSanctum()

  return http.post('/login', credentials)
}

export const logout = (): Promise<AxiosResponse> => {
  return http.post('/logout')
}
