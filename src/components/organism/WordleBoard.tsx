import { useEffect, useState } from "react"
import { useWindowSize, useAudio } from 'react-use'
import Confetti from "react-confetti"
import Row from "@/components/atom/Row"
import { Button } from "@/components/ui/button"
import { RotateCcw, Swords } from 'lucide-react';
import Keyboard from "@/components/molecule/Keyboard"
import { useWordleStore } from "@/store/useWordleStore"
import type { KeyStatus } from "@/types/wordle-store"

type WordleBoardProp = {
  word: string
}

export const WordleBoard = ({ word }: WordleBoardProp) => {
  const NUM_TRIES = 5
  const CHAR_CODE_A = 65
  const CHAR_CODE_Z = 90
  const BACKSPACE_KEY = "BACKSPACE"
  const ENTER_KEY = "ENTER"

  const [guess, setGuess] = useState<string>("")
  const [trials, setTrials] = useState<Array<string | null>>([])
  const [keyPressed, setKeyPressed] = useState<string>("")
  const [gameResult, setGameResult] = useState<"winner" | "loser" | null>(null)
  const [gameStatus, setGameStatus] = useState<"ongoing" | "finish">("ongoing")
  const [tries, setTries] = useState<number>(NUM_TRIES)

  // zustand store
  const addKeys = useWordleStore((state) => state.add) 
  const getKeysString = useWordleStore((state) => state.getKeysString)
  const updateKey = useWordleStore((state) => state.update)

  const { width, height } = useWindowSize()
  const audio1 = useAudio({
    src: './src/assets/sound-effects/applaud-win.mp3',
    autoPlay: false
  });
  const audio2 = useAudio({
    src: './src/assets/sound-effects/win2.mp3',
    autoPlay: false
  });

  function handleKeyLetterState(guessWord: string) {
    guessWord.split('').forEach((letter, index) => {
      const storedKeys = getKeysString()
      const letterIndexInWord = word.indexOf(letter)

      let status: KeyStatus;

      if(letterIndexInWord < 0) { 
        status = "invalid" 
      }
      else if(letterIndexInWord === index) { 
        status = "valid" 
      }
      else {
        status = "misplaced"
      }
      
      if(storedKeys.includes(letter.toUpperCase())) {
        updateKey(letter, status)
      } 
      else {
        addKeys({
          value: letter.toUpperCase(),
          status
        })
      }
    })
  }

  function handleGame() {
    if(tries <= 1 && guess !== word) {
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
    handleKeyLetterState(guess)
  }

  useEffect(() => {
    if(!word || !word.length) return
    setTrials(["current", ...Array(NUM_TRIES-1).fill(null)])
  }, [word])

  useEffect(() => {
    if(!word.length) return

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

    if(keyPressed.toUpperCase() === ENTER_KEY && guess.length === word.length){
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

    if(keyPressed.toUpperCase() === BACKSPACE_KEY){
      if(!guess.length) return 

      setGuess((prev) => prev.slice(0, guess.length-1))
      setKeyPressed("")
      return
    } 

    if(guess.length >= word.length) return
    if(keyPressed.length > 1) return

    if(keyPressed.toUpperCase().charCodeAt(0) >= CHAR_CODE_A && keyPressed.toUpperCase().charCodeAt(0) <= CHAR_CODE_Z){
      setGuess((prev) => prev+keyPressed.toUpperCase())
      setKeyPressed("")
      return
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyPressed])

  return (
    <div className="mt-6 sm:mt-16 flex flex-col items-center justify-center">
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
      <GameResult result={gameResult}/>

      <div className="relative flex flex-col sm:flex-row gap-6">
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
        <div className="absolute -right-48 w-fit min-w-24 hidden sm:block sm:min-w-36">
          <TrialsCard tries={tries}/>
        </div>
      </div>
      <GameStatus 
        status={gameStatus} 
        onKeyPress={(key) => setKeyPressed(key.toUpperCase())}
      />
    </div>
  )
}

const GameResult = ({ result }: { result: 'winner' | 'loser' | null }) => {
  return (
    <h1 className="text-3xl sm:text-4xl mb-6 sm:mb-12 font-bold">
      { 
        result === "winner" 
          ? "You win 🥳👏" 
          : result === null 
            ? <div className="flex items-center justify-center gap-2">
                <p>Game is on</p> 
                <Swords size={36} />
              </div> 
            : "You lose 😭😭"
      }
    </h1>
  )
}

const TrialsCard = ({ tries }: { tries: number}) => {
  return (
    <div className="relative bg-gray-100 rounded-sm h-fit p-6 border text-center">
      <h2 className="font-bold text-2xl sm:text-4xl">{tries}</h2>
      <p className="mt-2">Tries left</p>
    </div>
  )
}

type GameStatusProp = { 
  status: "finish" | "ongoing", 
  onKeyPress: (key: string) => void
}

const GameStatus = ({ status, onKeyPress }: GameStatusProp) => {
  return (
    <>
    {
      status === "finish" 
        ? <div className="mt-24 flex flex-col items-center justify-between">
            <Button 
              className="rounded-full bg-white text-black border hover:bg-white hover:text-black hover:scale-110"
              onClick={() => window.location.reload()}
              >
              <RotateCcw size={96}/>
            </Button>
            <p className="mt-2 text-lg font-normale">Restart</p>
          </div>
        :  <section className="absolute bottom-10 sm:bottom-30 ">
              <Keyboard 
                clickHandler={onKeyPress}
              />
            </section>
      } 
    </>
  )
}
