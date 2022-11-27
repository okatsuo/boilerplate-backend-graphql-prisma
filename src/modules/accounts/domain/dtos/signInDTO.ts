import { AccountModel } from '../entities/accountModel'

export interface SignInDTO {
  email: string
  password: string
}

export interface SignInResponseDTO {
  account: AccountModel
  accessToken: string
}
