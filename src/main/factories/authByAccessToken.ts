import { AccountRepositoryPrisma } from '../../modules/accounts/infra/db/prisma/accountRepository'
import { AuthByAccessToken } from '../../modules/accounts/useCases/authByAccessToken/authByAccessToken'
import { JsonwebtokenCryptography } from '../../shared/infra/cryptography/jsonwebtoken'

export const makeAuthByAccessToken = (): AuthByAccessToken => {
  const accountsRepository = new AccountRepositoryPrisma()
  const jsonwebtoken = new JsonwebtokenCryptography()
  return new AuthByAccessToken(jsonwebtoken, accountsRepository)
}
