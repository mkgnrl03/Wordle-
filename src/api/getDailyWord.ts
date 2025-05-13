import { words } from "../mocks/words"

export async function getDailyWord(): Promise<string> {
  return await new Promise((resolve) => {
    setTimeout(() => {
      const randomNumber = Math.floor(Math.random() * words.length)
      const word = words[randomNumber]
      resolve(word)
    }, 100)
  })
}