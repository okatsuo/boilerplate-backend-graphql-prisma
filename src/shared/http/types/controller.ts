import { AccountModel } from '../../../modules/accounts/domain/entities/accountModel'
import { HttpResponse } from './httpResponse'

export interface Controller<Input = any> {
  handle: (data: Input, account?: AccountModel) => Promise<HttpResponse>
}
