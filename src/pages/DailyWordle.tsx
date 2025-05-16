import { getDailyWord } from "@/api/getDailyWord"
import { WordleBoard } from "@/components/organism/WordleBoard"
import { useEffect, useState } from "react"
import { Grid2x2 } from 'lucide-react';
import { useDailyWordStore } from "@/store/useDailyWordStore";

function DailyWordle() {
  const wordOfTheDay = useDailyWordStore((state) => state.wordOfTheDay)
  const setWordOfTheDay = useDailyWordStore((state) => state.setWord)
  const [isLoading, setLoading] = useState<boolean>(false)
  const [resetGame, setResetGame] = useState<boolean>(false)

  function resetGameHandler() {
    setResetGame((prev) => !prev)
  }

  useEffect(() => {
    setLoading(true)
    async function getWordOfTheDay() {
      // mocking api fetch
      try{
        const word = await getDailyWord()
        setWordOfTheDay(word)
        setTimeout(() => {
          setLoading(false)
        }, 500)
      }
      catch(e) {
        console.error(e)
      }
    } 
    getWordOfTheDay()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetGame])

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

  return <>
     <h1>{wordOfTheDay}</h1>
     <WordleBoard 
        word={wordOfTheDay} 
        onResetGame={resetGameHandler}
      />
  </>
 
}

export default DailyWordle