import { prismaClient } from '../../../../../shared/infra/db/prismaClient'
import { SignUpDTO } from '../../../domain/dtos/signUpDTO'
import { AccountModel } from '../../../domain/entities/accountModel'
import { FindAccountByEmail, FindAccountById, SignUpRepository } from '../../../repositories/accountsRepository'

export class AccountRepositoryPrisma implements FindAccountByEmail, FindAccountById, SignUpRepository {
  async createAccount ({ email, password, username }: SignUpDTO): Promise<AccountModel> {
    return await prismaClient.account.create({
      data: {
        username,
        password,
        email
      }
    })
  }

  async findById (id: string): Promise<AccountModel | null> {
    return await prismaClient.account.findUnique({ where: { id } })
  }

  async findByEmail (email: string): Promise<AccountModel | null> {
    return await prismaClient.account.findUnique({ where: { email } })
  }
}
