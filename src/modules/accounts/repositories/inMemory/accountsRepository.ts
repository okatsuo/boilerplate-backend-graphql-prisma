import { randomUUID } from 'crypto'
import { SignUpDTO } from '../../domain/dtos/signUpDTO'
import { AccountModel } from '../../domain/entities/accountModel'
import { FindAccountByEmail, SignUpRepository } from '../accountsRepository'

export class AccountRepositoryInMemory implements SignUpRepository, FindAccountByEmail {
  private static instance: AccountRepositoryInMemory

  static getInstance (): AccountRepositoryInMemory {
    if (!AccountRepositoryInMemory.instance) {
      this.instance = new AccountRepositoryInMemory()
    }
    return AccountRepositoryInMemory.instance
  }

  private constructor () {}

  private readonly accounts: AccountModel[] = []
  async createAccount ({ email, password, username }: SignUpDTO): Promise<AccountModel> {
    const newAccount: AccountModel = {
      id: randomUUID(),
      email,
      username,
      password,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    this.accounts.push(newAccount)
    return newAccount
  }

  async findByEmail (email: string): Promise<AccountModel | null> {
    return this.accounts.find(account => account.email === email) ?? null
  }

  async findById (id: string): Promise<AccountModel | null> {
    return this.accounts.find(account => account.id === id) ?? null
  }
}
