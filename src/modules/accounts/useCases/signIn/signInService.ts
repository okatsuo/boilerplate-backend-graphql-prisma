import { Encrypt } from '../../../../shared/infra/types/cryptography'
import { SignInDTO, SignInResponseDTO } from '../../domain/dtos/signInDTO'
import { HashComparer } from '../../domain/infra/cryptography'
import { FindAccountByEmail } from '../../repositories/accountsRepository'

export class SignInService {
  constructor (
    private readonly accountsRepository: FindAccountByEmail,
    private readonly cryptography: HashComparer,
    private readonly encrypter: Encrypt
  ) {}

  async authenticate ({ email, password }: SignInDTO): Promise<SignInResponseDTO | null> {
    const account = await this.accountsRepository.findByEmail(email)

    if (!account) return null

    const isValidPassword = await this.cryptography.compare(password, account.password)

    if (!isValidPassword) return null

    const accessToken = await this.encrypter.encrypt({ id: account.id })

    return {
      accessToken,
      account
    }
  }
}
