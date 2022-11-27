export interface HttpResponse<T = any> {
  httpCode: number
  body: T
}
