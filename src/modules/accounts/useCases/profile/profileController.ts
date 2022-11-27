import { internalServerError, ok } from '../../../../shared/http/helpers'
import { Controller } from '../../../../shared/http/types/controller'
import { HttpResponse } from '../../../../shared/http/types/httpResponse'
import { AccountModel } from '../../domain/entities/accountModel'

export class ProfileController implements Controller {
  async handle (_data: any, account: AccountModel | undefined): Promise<HttpResponse> {
    try {
      return ok(account)
    } catch (error) {
      return internalServerError()
    }
  }
}
