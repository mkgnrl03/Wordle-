export type KeyStatus = 'invalid' | 'valid' | 'misplaced'

export type UsedKeyType = {
  value: string,
  status: KeyStatus,
}
