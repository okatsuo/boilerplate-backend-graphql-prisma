import { Decrypt } from '../../../../shared/infra/types/cryptography'

import { forbidden, ok } from '../../../../shared/http/helpers'
import { Controller } from '../../../../shared/http/types/controller'
import { HttpResponse } from '../../../../shared/http/types/httpResponse'
import { FindAccountById } from '../../repositories/accountsRepository'

interface Request {
  accessToken?: string
}

export class AuthByAccessToken implements Controller {
  constructor (
    private readonly decryptor: Decrypt,
    private readonly accountsRepository: FindAccountById
  ) {}

  async handle ({ accessToken }: Request): Promise<HttpResponse> {
    try {
      if (!accessToken) return forbidden()
      const { id } = await this.decryptor.decrypt(accessToken)
      const user = await this.accountsRepository.findById(id)
      if (!user) return forbidden()
      return ok(user)
    } catch (error) {
      return forbidden()
    }
  }
}
