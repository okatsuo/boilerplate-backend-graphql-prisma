import { hash, compare } from 'bcryptjs'
import { HashComparer, Hasher } from '../../domain/infra/cryptography'

export class BcryptCryptography implements Hasher, HashComparer {
  async encrypt (plaintext: string): Promise<string> {
    return hash(plaintext, 12)
  }

  async compare (plaintext: string, hash: string): Promise<boolean> {
    return compare(plaintext, hash)
  }
}
