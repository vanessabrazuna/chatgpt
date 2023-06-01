'use client'

import { useEffect, useState } from 'react'
import { Chat } from '@/types/Chat'
import { v4 as uuidv4 } from 'uuid'

import { Sidebar } from '@/components/Sidebar'
import { Header } from '@/components/Header'
import { ChatQuestions } from '@/components/ChatQuestions'
import { Footer } from '@/components/Footer'

export default function Home() {
  const [sidebarOpened, setSidebarOpened] = useState(false)
  const [chatList, setChatList] = useState<Chat[]>([])
  const [chatActiveId, setChatActiveId] = useState<string>('')
  const [chatActive, setChatActive] = useState<Chat>()
  const [AILoading, setAILoading] = useState(false)

  useEffect(() => {
    setChatActive(chatList.find(message => message.id === chatActiveId))
  }, [chatActiveId, chatList])

  useEffect(() => {
    if(AILoading) {
      getAIResponse()
    }
  }, [AILoading])

  const openSidebar = () => setSidebarOpened(true)
  const closeSidebar = () => setSidebarOpened(false)

  function getAIResponse() {
    setTimeout(() => {
      let chatListClone = [...chatList]
      let chatIndex = chatListClone.findIndex(message => message.id === chatActiveId)
      if(chatIndex > -1) {
        chatListClone[chatIndex].messages.push({
          id: uuidv4(),
          author: 'ai',
          body: 'If you have any questions or need assistance. Im ready to respond!'
        })
      }
      setChatList(chatListClone)
      setAILoading(false)
    }, 2000)
  }

  function handleClearConversations() {
    if (AILoading) return

    setChatActiveId('')
    setChatLis([])
  }

  function handleNewChat() {
    if (AILoading) return

    setChatActiveId('')
    closeSidebar()
  }

  function handleSendMessage(message: string) {
    if (!chatActiveId) {
      // Creating new chat
      let newChatId = uuidv4()

      setChatLis([
        {
          id: newChatId,
          title: message,
          messages: [{ id: uuidv4(), author: 'me', body: message }]
        },
        ...chatList
      ])

      setChatActiveId(newChatId)
    } else {
      // Updating existing chat
      let chatListClone = [...chatList]

      let chatIndex = chatListClone.findIndex(chat => chat.id === chatActiveId)
      chatListClone[chatIndex].messages.push({
        id: uuidv4(),
        author: 'me',
        body: message
      })
      setChatLis(chatListClone)
    }

    setAILoading(true)
  }

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

        <ChatQuestions chat={chatActive} loading={AILoading} />

        <Footer onSendMessage={handleSendMessage} disabled={AILoading} />
      </section>
    </main>
  )
}
