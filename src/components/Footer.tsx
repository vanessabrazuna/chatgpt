import { ChatMessageInput } from './ChatMessageinput'

type FooterProps = {
  disabled: boolean
  onSendMessage: (message: string) => void
}

export function Footer({ disabled, onSendMessage }: FooterProps) {
  return (
    <footer className="w-full border-t border-gray-600 p-2">
      <div className="max-w-4xl m-auto">
        <ChatMessageInput disabled={disabled} onSend={onSendMessage} />

        <div className="pt-3 text-center text-xs text-gray-300">
          Free search preview. ChatGPT Clone can produce inaccurate information
          about people, places, or facts.
        </div>
      </div>
    </footer>
  )
}
