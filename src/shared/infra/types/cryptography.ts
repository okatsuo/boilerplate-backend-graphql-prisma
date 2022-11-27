export interface Encrypt {
  encrypt: (data: any) => Promise<string>
}

export interface Decrypt<T = any> {
  decrypt: (encryptedText: string) => Promise<T>
}
