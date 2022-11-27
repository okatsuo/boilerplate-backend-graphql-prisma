import { badRequest, internalServerError, ok } from '../../../../shared/http/helpers'
import { Controller } from '../../../../shared/http/types/controller'
import { HttpResponse } from '../../../../shared/http/types/httpResponse'
import { SignUpService } from './signUpService'

interface Request {
  username: string
  email: string
  password: string
}

export class SignUpController implements Controller {
  constructor (
    private readonly signUpService: SignUpService
  ) {
  }

  async handle ({ username, email, password }: Request): Promise<HttpResponse> {
    try {
      const account = await this.signUpService.execute({ username, email, password })
      if (account === false) return badRequest('Email already in use')
      return ok(account)
    } catch (error) {
      return internalServerError()
    }
  }
}
