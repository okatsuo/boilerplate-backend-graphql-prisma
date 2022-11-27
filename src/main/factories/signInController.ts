import { BcryptCryptography } from '../../modules/accounts/infra/cryptography/bcrypt'
import { AccountRepositoryPrisma } from '../../modules/accounts/infra/db/prisma/accountRepository'
import { SignInController } from '../../modules/accounts/useCases/signIn/signInController'
import { SignInService } from '../../modules/accounts/useCases/signIn/signInService'
import { JsonwebtokenCryptography } from '../../shared/infra/cryptography/jsonwebtoken'

export const makeSignInController = (): SignInController => {
  const accountsRepositoryInMemory = new AccountRepositoryPrisma()
  const bcrypt = new BcryptCryptography()
  const jsonwebtoken = new JsonwebtokenCryptography()
  const signInService = new SignInService(accountsRepositoryInMemory, bcrypt, jsonwebtoken)
  return new SignInController(signInService)
}
