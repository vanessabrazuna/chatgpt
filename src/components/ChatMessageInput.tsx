import { KeyboardEvent, useEffect, useRef, useState } from "react"
import { Send } from "lucide-react"

type ChatMessageInputProps = {
  disabled: boolean
  onSend: (message: string) => void
}

export function ChatMessageInput({ disabled, onSend }: ChatMessageInputProps) {
  const [text, setText] = useState('')
  const textElement = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if(textElement.current) {
      textElement.current.style.height = '0px'
      let scrollHeight = textElement.current.scrollHeight
      textElement.current.style.height = `${scrollHeight}px`
    }
  }, [text, textElement])

  function handleTextKeyUp(event: KeyboardEvent<HTMLTextAreaElement>) {
    if(event.code.toLowerCase() === 'enter' && !event.shiftKey) {
      event.preventDefault()
      handleSendMessage()
    }
  }

  function handleSendMessage() {
    if(!disabled && text.trim() !== '') {
      onSend(text)
      setText('')
    }
  }

  return (
    <div className={`flex border-gray-800/50 bg-gpt-lightgray p-2 rounded-md
      ${disabled && 'opacity-50'}`}>

      <textarea
        ref={textElement}
        className="flex-1 border-0 bg-transparent resize-none outline-none 
          h-6 max-h-48 overflow-y-auto"
        placeholder="Send a message."
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyUp={handleTextKeyUp} /* send by enter */
        disabled={disabled}
      />

      <div onClick={handleSendMessage} 
        className={`self-end p-1 cursor-pointer rounded
          ${text.length ? 'opacity-100 hover:bg-black/20' : 'opacity-20'}`}
      >
        <Send size={14} />
      </div>
    </div>
  )
}