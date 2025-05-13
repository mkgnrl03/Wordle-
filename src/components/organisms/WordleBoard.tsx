import { useEffect, useState } from "react"
import { useWindowSize, useAudio } from 'react-use'
import Confetti from "react-confetti"
import Row from "../Row"
import { getDailyWord } from "../../api/getDailyWord"
import { Button } from "../ui/button"
import { RotateCcw } from 'lucide-react';

export default function WordleBoard() {
  const NUM_TRIES = 5
  const [word, setWord] = useState<string>("")
  const [guess, setGuess] = useState<string>("")
  const [trials, setTrials] = useState<Array<string | null>>([])
  const [keyPressed, setKeyPressed] = useState<string>("")
  const [gameResult, setGameResult] = useState<"winner" | "loser" | null>(null)
  const [gameStatus, setGameStatus] = useState<"ongoing" | "finish">("ongoing")
  const [tries, setTries] = useState<number>(NUM_TRIES)

  const { width, height } = useWindowSize()
  const audio1 = useAudio({
    src: './src/assets/sound-effects/applaud-win.wav',
    autoPlay: false
  });
  const audio2 = useAudio({
    src: './src/assets/sound-effects/win2.wav',
    autoPlay: false
  });

  function handleGame() {
    if(tries <= 1 && guess !== word) {
      console.log("loser")
      setGameResult("loser")
      setGameStatus("finish")
   }
    else if(guess === word) {
      setGameResult("winner")
      setGameStatus("finish")
      audio2[2].play()
      audio1[2].play()
    }
    setTries((prev: number) => prev-1)
  }

  useEffect(() => {
    async function getWordOfTheDay() {
      // mocking api fetch
      try{
        const word = await getDailyWord()
        setWord(word)
        setTrials(["current", ...Array(NUM_TRIES-1).fill(null)])
      }
      catch(e) {
        console.error(e)
      }
    } 
    getWordOfTheDay()
  }, [])

  useEffect(() => {
    if(!word) return

    const handleKeyDown = (e: KeyboardEvent) => {
      setKeyPressed(e.key)
    }

    document.addEventListener('keydown', handleKeyDown, true)
    return () => { 
      document.removeEventListener('keydown', handleKeyDown) 
    }

  }, [word])

  useEffect(() => {
    if(gameStatus === 'finish') return

    if(keyPressed === "Enter" && guess.length === word.length){
      setTrials((prev) => {
          const spot = trials.findIndex((val) => val === null)
          if(spot > 0){
            prev[spot] = "current"
            prev[spot-1] = guess
          }
          else {
            prev[trials.length-1] = guess
          }
          return [...prev]
        })
      handleGame()
      setGuess("")
      return 
    }

    if(keyPressed === "Backspace"){
      console.log(keyPressed)
      setGuess((prev) => prev.slice(0, guess.length-1))
      setKeyPressed("")
      return
    } 

    if(keyPressed.length > 1) return

    if(keyPressed.toUpperCase().charCodeAt(0) >= 65 && keyPressed.toUpperCase().charCodeAt(0) <= 90){
      if(guess.length >= word.length){
        return
      }
      setGuess((prev) => prev+keyPressed.toUpperCase())
      setKeyPressed("")
      return
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyPressed])

  return (
    <div className="mt-16 flex flex-col items-center justify-center">
      {audio1[0]}
      {audio2[0]}
      <Confetti
        width={width}
        height={height}
        run={gameResult === "winner"}
        numberOfPieces={200}
        confettiSource={{x: 0, y: 0, w: width, h:0}}
        gravity={0.2}
      />
      <h1 className="text-4xl mb-12 font-bold">
        { 
          gameResult === "winner" 
            ? "You win 🥳👏" 
            : gameResult === null ? "Wordle++" : "You lose 😭😭"
        }
      </h1>
      <div className="flex gap-6">
        <div className="flex flex-col gap-2 items-center justify-center ">
          {
            trials.map((row, index) => (
              <Row 
                key={index} 
                wordLength={word.length} 
                guess={row === "current" ? guess : row }
                word={word}
                isChecked={row !== null && row !== "current"}
              />
            ))
          }
        </div>
   
        <div className="flex flex-col w-fit min-w-40 gap-6">
          <div className="relative bg-gray-100 rounded-sm h-fit p-6 border text-center">
             <h2 className="font-bold text-4xl">{tries}</h2>
             <p className="mt-2">Tries left</p>
          </div>
        </div>
      </div>
      {
        gameStatus === "finish" 
          ? <div className="mt-24 flex flex-col items-center justify-between">
              <Button 
              className="rounded-full bg-white text-black border hover:bg-white hover:text-black hover:scale-110"
              onClick={() => window.location.reload()}
              >
                <RotateCcw size={96}/>
              </Button>
              <p className="mt-2 text-lg font-normale">Restart</p>
            </div>
          : ""
      }
    </div>
  )
}
