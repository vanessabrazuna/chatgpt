import { Chat } from '@/types/Chat'
import { ChatPlaceholder } from './ChatPlaceholder'
import { ChatMessage } from './ChatMessage'

type ChatQuestionsProps = {
  chat: Chat | undefined
}

export function ChatQuestions({ chat }: ChatQuestionsProps) {
  return (
    <section className="flex-auto h-0 overflow-y-scroll">
      {!chat && <ChatPlaceholder />}
      {chat &&
        chat.messages.map(message => {
          return <ChatMessage key={message.id} message={message} />
        })}
    </section>
  )
}
