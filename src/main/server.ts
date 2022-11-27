import 'dotenv/config'
import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { apolloServerAdapter } from './adapters/apolloServerAdapter'
import { makeAuthByAccessToken } from './factories/authByAccessToken'
import { makeProfileController } from './factories/profileController'
import { makeSignInController } from './factories/signInController'
import { makeSignUpController } from './factories/signUpController'
import { typeDefs } from './typeDefs'
import { environmentVariables } from './config/environmentVariables'

/*
  TODO:
  [] Criar Scalar para o Date
*/

const resolvers = {
  Query: {
    profile: apolloServerAdapter(makeProfileController(), makeAuthByAccessToken()),
    signIn: apolloServerAdapter(makeSignInController())
  },
  Mutation: {
    signUp: apolloServerAdapter(makeSignUpController())
  }
}

class App {
  static async start (): Promise<void> {
    const server = new ApolloServer({
      typeDefs,
      resolvers
    })

    const { url } = await startStandaloneServer(server, {
      listen: { port: environmentVariables.port },
      context: async ({ req }) => ({ authorization: req.headers.authorization })
    })
    console.log(`Server running at ${url}`)
  }
}

App.start().catch(console.error)
