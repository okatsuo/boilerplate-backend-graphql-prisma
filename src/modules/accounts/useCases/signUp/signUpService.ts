import { SignUpDTO } from '../../domain/dtos/signUpDTO'
import { AccountModel } from '../../domain/entities/accountModel'
import { Hasher } from '../../domain/infra/cryptography'
import { FindAccountByEmail, SignUpRepository } from '../../repositories/accountsRepository'

export class SignUpService {
  constructor (
    private readonly accountsRepository: SignUpRepository & FindAccountByEmail,
    private readonly cryptography: Hasher
  ) {}

  async execute ({ email, password, username }: SignUpDTO): Promise<AccountModel | false> {
    const accountExists = await this.accountsRepository.findByEmail(email)
    if (accountExists) return false
    const encryptedPassword = await this.cryptography.encrypt(password)
    const account = await this.accountsRepository.createAccount({ email, password: encryptedPassword, username })
    return account
  }
}
