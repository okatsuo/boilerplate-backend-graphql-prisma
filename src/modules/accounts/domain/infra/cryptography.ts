export interface Hasher {
  encrypt: (plaintext: string) => Promise<string>
}

export interface HashComparer {
  compare: (plaintext: string, hash: string) => Promise<boolean>
}
