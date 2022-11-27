import { HttpResponse } from '../types/httpResponse'

export const ok = <T> (body: T): HttpResponse<T> => ({
  httpCode: 200,
  body
})

export const badRequest = (message: string): HttpResponse<Error> => ({
  httpCode: 400,
  body: new Error(message)
})

export const unauthorized = (): HttpResponse<Error> => ({
  httpCode: 401,
  body: new Error('Unauthorized')
})

export const forbidden = (): HttpResponse<Error> => ({
  httpCode: 403,
  body: new Error('Forbidden')
})

export const internalServerError = (): HttpResponse<Error> => ({
  httpCode: 500,
  body: new Error('Internal Server Error')
})
