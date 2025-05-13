
type RowProp = {
  wordLength: number
  guess: string | null
  word: string
  isChecked: boolean
}

export default function Row({ wordLength, guess, word, isChecked }: RowProp) {
  const letters = Array(wordLength).fill({
    value: null,
    class: ""
  })
  
  if(guess !== null) {
    guess.split('').forEach((letter, index) => {
      letters[index] = {
        value: letter,
        class: getLetterClass(letter, index)
      }
    })
  }

  function getLetterClass(letter: string, index: number): string {
    let style = ""

    if(!isChecked){
      return style
    }

    if(word.includes(letter)){
      style = word[index] === letter ? "bg-green-300" : "bg-yellow-300"
    }
    else {
      style = "bg-red-300"
    }
    return style
  }

  return (
    <div className="flex gap-2">
        {
          letters.map((letter, index) => (
            <div 
              key={letter.value+index}
              className={`p-2 w-16 aspect-square border rounded shadow-md border-black grid place-items-center
                ${letter.class}  
              `}
            >
                <p>{letter.value}</p>
            </div>
          ))
        }
    </div>
  )
}
