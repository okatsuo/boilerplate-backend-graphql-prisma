import { SignUpDTO } from '../domain/dtos/signUpDTO'
import { AccountModel } from '../domain/entities/accountModel'

export interface SignUpRepository {
  createAccount: (data: SignUpDTO) => Promise<AccountModel>
}

export interface FindAccountByEmail {
  findByEmail: (email: string) => Promise<AccountModel | null>
}

export interface FindAccountById {
  findById: (id: string) => Promise<AccountModel | null>
}
