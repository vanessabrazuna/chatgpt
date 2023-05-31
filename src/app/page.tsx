'use client'

import { useEffect, useState } from 'react'
import { Chat } from '@/types/Chat'

import { Sidebar } from '@/components/Sidebar'
import { Header } from '@/components/Header'
import { ChatQuestions } from '@/components/ChatQuestions'
import { Footer } from '@/components/Footer'

export default function Home() {
  const [sidebarOpened, setSidebarOpened] = useState(false)
  const [chatList, setChatLis] = useState<Chat[]>([])
  const [chatActiveId, setChatActiveId] = useState<string>([])('')
  const [chatActive, setChatActive] = useState<Chat>()
  const [AILoading, setAILoading] = useState(false)

  useEffect(() => {
    setChatActive(chatList.find(message => message.id === chatActiveId))
  }, [chatActiveId, chatList])

  const openSidebar = () => setSidebarOpened(true)
  const closeSidebar = () => setSidebarOpened(false)

  function handleClearConversations() {}

  function handleNewChat() {}

  function handleSendMessage() {}

  return (
    <main className="flex min-h-screen bg-gpt-gray">
      <Sidebar
        open={sidebarOpened}
        onClose={closeSidebar}
        onClear={handleClearConversations}
        onNewChat={handleNewChat}
      >
        <div className=""></div>
      </Sidebar>

      <section className="flex flex-col w-full">
        <Header
          openSidebarClick={openSidebar}
          title={``}
          newChatClick={handleNewChat}
        />

        <ChatQuestions chat={chatActive} />

        <Footer onSendMessage={handleSendMessage} disabled={AILoading} />
      </section>
    </main>
  )
}
