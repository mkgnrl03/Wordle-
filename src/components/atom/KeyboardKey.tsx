import { useWordleStore } from '@/store/useWordleStore'

type Prop = {
  letter: string
  clickHandler: (key: string) => void
}

function KeyboardKey({ letter, clickHandler }: Prop) {
  const findKey = useWordleStore((state) => state.find)
  const selectedKey = findKey(letter)

  const isEnterKey = letter.toLowerCase() === "enter"
  const isBackspaceKey = letter.toLowerCase() === "backspace"
  const globalStyle = `
    flex items-center justify-center bg-gray-500 
    text-md text-white text-center font-semibold h-fit
    shadow rounded min-h-12 py-1 px-2 min-w-7
    sm:text-xl sm:px-4 sm:py-4
  `

  function getKeyClassColor(): string {
    if(!selectedKey) return ""
    if(selectedKey.status === "invalid") {
      return "bg-gray-500 opacity-50"
    }
    else if (selectedKey.status === "misplaced") {
      return "bg-yellow-500"
    }
    else if(selectedKey.status === 'valid') {
      return "bg-green-500"
    }
    else {
      return "bg-zinc-500"
    }
  }   

  if(isEnterKey){
    return (
      <button 
        className={`${globalStyle} text-[12px]`}
        onClick={() => clickHandler(letter)}
      >
          ↵ Enter
      </button>
    )
  }

  if(isBackspaceKey){
    return (
      <button 
        className={`${globalStyle} px-3 sm:px-7`}
        onClick={() => clickHandler(letter)}
      >
        [ x ]
      </button>
    )
  }

  return (
    <button 
      className={`
         ${globalStyle} 
         ${getKeyClassColor()}
      `}
      onClick={() => clickHandler(letter)}
    >
      <span>{letter}</span>
    </button>
  )
}

export default KeyboardKey