import type { KeyStatus, UsedKeyType } from '@/types/wordle-store'
import { create } from 'zustand'

type WordleType = {
  usedKeys: Array<UsedKeyType>
  add: (key: UsedKeyType) => void
  getKeysString: () => Array<string>
  find: (letter: string) => UsedKeyType | undefined
  update: (letter: string, status: KeyStatus) => void
}

export const useWordleStore = create<WordleType>((set, get) => ({
  usedKeys: [],
  add: (key: UsedKeyType) => {
    set((state) => ({
        usedKeys: [...state.usedKeys, key]
    }))
  },
  getKeysString: () => {
    return get().usedKeys.map(key => key.value)
  },
  find: (letter: string) => {
    return get().usedKeys.find((key) => key.value === letter.toUpperCase())
  },
  update: (letter: string, status: KeyStatus) => {
    const key = get().find(letter)
    if(!key) return

    key.status = status
  }
}))