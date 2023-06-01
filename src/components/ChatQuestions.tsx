import { Chat } from '@/types/Chat'
import { ChatPlaceholder } from './ChatPlaceholder'
import { ChatMessage } from './ChatMessage'
import { ChatMessageLoading } from './ChatMessageLoading'

type ChatQuestionsProps = {
  chat: Chat | undefined
  loading: boolean
}

export function ChatQuestions({ chat, loading }: ChatQuestionsProps) {
  return (
    <section className="flex-auto h-0 overflow-y-scroll">
      {!chat && <ChatPlaceholder />}
      {chat &&
        chat.messages.map(message => {
          return <ChatMessage key={message.id} message={message} />
        })}

        {loading && <ChatMessageLoading />}
    </section>
  )
}
