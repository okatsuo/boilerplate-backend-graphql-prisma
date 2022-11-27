import { internalServerError, ok, unauthorized } from '../../../../shared/http/helpers'
import { Controller } from '../../../../shared/http/types/controller'
import { HttpResponse } from '../../../../shared/http/types/httpResponse'
import { SignInDTO } from '../../domain/dtos/signInDTO'
import { SignInService } from './signInService'

export class SignInController implements Controller {
  constructor (private readonly signUpService: SignInService) {}
  async handle ({ email, password }: SignInDTO): Promise<HttpResponse> {
    try {
      const accountAndAccessToken = await this.signUpService.authenticate({ password, email })
      if (!accountAndAccessToken) return unauthorized()
      return ok(accountAndAccessToken)
    } catch (error) {
      return internalServerError()
    }
  }
}
