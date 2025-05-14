import { getDailyWord } from "@/api/getDailyWord"
import { WordleBoard } from "@/components/organism/WordleBoard"
import { useEffect, useState } from "react"
import { Grid2x2 } from 'lucide-react';

function DailyWordle() {
  const [word, setWord] = useState<string>("")
  const [isLoading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    setLoading(true)
    async function getWordOfTheDay() {
      // mocking api fetch
      try{
        const word = await getDailyWord()
        setWord(word)
        setTimeout(() => {
          setLoading(false)
        }, 1500)
      }
      catch(e) {
        console.error(e)
      }
    } 
    getWordOfTheDay()
  }, [])

  if(isLoading){
    return (
      <div className="flex flex-col items-center justify-center gap-3 h-dvh">
        <Grid2x2 
          size={56}
          className="animate-bounce"
        />
        <p className="text-lg">Loading Game...</p>
      </div>
    )
  }

  return <WordleBoard word={word} />
}

export default DailyWordle