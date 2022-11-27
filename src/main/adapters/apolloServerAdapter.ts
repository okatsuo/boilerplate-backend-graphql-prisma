import { GraphQLError } from 'graphql'
import { AccountModel } from '../../modules/accounts/domain/entities/accountModel'
import { Controller } from '../../shared/http/types/controller'

export const apolloServerAdapter = (controller: Controller, authController?: Controller) => {
  return async (_parent: any, args: any, context: any, _info: any) => {
    let account: AccountModel | undefined
    if (authController) {
      const response = await authController.handle({ accessToken: context.authorization })
      if (response.httpCode === 403) throw new GraphQLError('You do not have access to be here.', { extensions: { code: 'FORBIDDEN' } })
      account = response.body
    }

    const httpResponse = await controller.handle(args, account)
    if (httpResponse.httpCode >= 200 && httpResponse.httpCode < 400) return httpResponse.body

    switch (httpResponse.httpCode) {
      case 400:
        throw new GraphQLError(httpResponse.body.message, { extensions: { code: 'BAD_USER_INPUT' } })

      case 401:
        throw new GraphQLError(httpResponse.body.message, { extensions: { code: 'UNAUTHORIZED' } })

      default:
        throw new GraphQLError('Internal Server Error', { extensions: { code: 'INTERNAL_SERVER_ERROR' } })
    }
  }
}
