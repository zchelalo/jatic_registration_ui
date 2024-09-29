import { AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios'

export type SuccessResponse = {
  code: string
  message: string
  data: object | string | null
  meta: object | null
}

export type ErrorResponse = {
  code: string
  message: string
  details: object | string | null
}

// baseInterceptor.js
export const baseRequestInterceptor = async (config: InternalAxiosRequestConfig) => {
  config.headers['Content-Type'] = 'application/json'
  return config
}

export const baseResponseInterceptor = async (response: AxiosResponse) => {
  response.data = response.data as SuccessResponse
  return response
}

export const baseErrorHandler = async (error: AxiosError) => {
  if (!error.response) {
    console.error('Network error or request not sent:', error.message)
    return Promise.reject({
      code: 'NETWORK_ERROR',
      message: 'Network error or request not sent',
      details: error.message
    } as ErrorResponse)
  }

  error.response.data = error.response.data as ErrorResponse
  return Promise.reject(error.response.data)
}
