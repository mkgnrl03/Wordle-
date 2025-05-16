import { create } from "zustand";

type DailyWordStore = {
  wordOfTheDay: string
  setWord: (word: string) => void,
  getWord: () => string
}

export const useDailyWordStore = create<DailyWordStore>((set, get) => ({
  wordOfTheDay: "",
  setWord: (word: string) => {
    set(() => ({
      wordOfTheDay: word,
    }))
  },
  getWord: () => get().wordOfTheDay
}))