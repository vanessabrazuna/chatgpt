import { ChatMessage } from "@/types/ChatMessage"
import { Bot, User2 } from "lucide-react"

type ChatMessageProps = {
  message: ChatMessage
}

export function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div className={`py-5 4{message.author === 'ai' && 'bg-gray-600/50'}`}>
      <div className="max-w-4xl m-auto flex">
        <div 
          className={`w-10 h-10 flex justify-center items-center mx-4 md:ml-0 rounded 
            ${message.author === 'ai' ? 'bg-green-900' : 'bg-blue-900'}`}
        >
          {message.author === 'me' && <User2 size={24} className="text-white"/>}
          {message.author === 'ai' && <Bot size={24} className="text-white" /> }
        </div>

        <div className="flex-1 text-base whitespace-pre-wrap text-white">
          {message.body}
        </div>
      </div>
    </div>
  )
}
