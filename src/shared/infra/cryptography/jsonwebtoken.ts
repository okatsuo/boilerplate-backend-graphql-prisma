import { Decrypt, Encrypt } from '../types/cryptography'
import jwt from 'jsonwebtoken'
import { environmentVariables } from '../../../main/config/environmentVariables'

const jwtSecret = environmentVariables.JWT_SECRET

export class JsonwebtokenCryptography implements Encrypt, Decrypt {
  async encrypt (data: any): Promise<string> {
    return jwt.sign(data, jwtSecret)
  }

  async decrypt<T = any> (encryptedText: string): Promise<T> {
    return jwt.verify(encryptedText, jwtSecret, { maxAge: '1d' }) as T
  }
}
