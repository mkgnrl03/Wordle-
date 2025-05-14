import KeyboardKey from "@/components/atom/KeyboardKey";

type Prop = {
  clickHandler: (key: string) => void
}
function Keyboard({ clickHandler }: Prop) {
  const keys = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['backspace', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'enter']
  ];

  return (
    <div>
      <div className="flex flex-col gap-2">
        {
          keys.map((row) => {
            return <div key={row.join("-")} className="text-sm flex items-center justify-center gap-1">
              {
                row.map((kkey) => {
                  return <KeyboardKey 
                    key={kkey} 
                    letter={kkey}
                    clickHandler={clickHandler}
                  />
                })
              }
            </div>
          })
        }
      </div>
    </div>
  )
}

export default Keyboard