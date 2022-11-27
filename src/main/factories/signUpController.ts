import { BcryptCryptography } from '../../modules/accounts/infra/cryptography/bcrypt'
import { AccountRepositoryPrisma } from '../../modules/accounts/infra/db/prisma/accountRepository'
import { SignUpController } from '../../modules/accounts/useCases/signUp/signUpController'
import { SignUpService } from '../../modules/accounts/useCases/signUp/signUpService'

export const makeSignUpController = (): SignUpController => {
  const accountRepositoryInMemory = new AccountRepositoryPrisma()
  const bcryptCryptography = new BcryptCryptography()
  const signUpService = new SignUpService(accountRepositoryInMemory, bcryptCryptography)
  return new SignUpController(signUpService)
}
