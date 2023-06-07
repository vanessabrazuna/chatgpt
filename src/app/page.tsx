'use client'

import { useEffect, useState } from 'react'
import { Chat } from '@/types/Chat'
import { v4 as uuidv4 } from 'uuid'

import { Sidebar } from '@/components/Sidebar'
import { Header } from '@/components/Header'
import { ChatQuestions } from '@/components/ChatQuestions'
import { Footer } from '@/components/Footer'
import { SidebarChatButton } from '@/components/SidebarChatButton'

import { openai } from '@/utils/openai'

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
    if (AILoading) {
      getAIResponse()
    }
  }, [AILoading])

  const openSidebar = () => setSidebarOpened(true)
  const closeSidebar = () => setSidebarOpened(false)

  function getAIResponse() {
    setTimeout(() => {
      let chatListClone = [...chatList]
      let chatIndex = chatListClone.findIndex(
        message => message.id === chatActiveId
      )
      if (chatIndex > -1) {
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
    setChatList([])
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

      setChatList([
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
      setChatList(chatListClone)
    }

    setAILoading(true)
  }

  function handleSelectChat(id: string) {
    if (AILoading) return

    let item = chatList.find(item => item.id === id)
    if (item) setChatActiveId(item.id)
    closeSidebar()
  }

  function handleDeleteChat(id: string) {
    let chatListClone = [...chatList]
    let chatIndex = chatListClone.findIndex(item => item.id === id)
    chatListClone.splice(chatIndex, 1)
    setChatList(chatListClone)
    setChatActiveId('')
  }

  function handleEditChat(id: string, newTitle: string) {
    if (newTitle) {
      let chatListClone = [...chatList]
      let chatIndex = chatListClone.findIndex(item => item.id === id)
      chatListClone[chatIndex].title = newTitle
      setChatList(chatListClone)
    }
  }

  return (
    <main className="flex min-h-screen bg-gpt-gray">
      <Sidebar
        open={sidebarOpened}
        onClose={closeSidebar}
        onClear={handleClearConversations}
        onNewChat={handleNewChat}
      >
        {chatList.map(item => (
          <SidebarChatButton
            key={item.id}
            chatItem={item}
            active={item.id === chatActiveId}
            onClick={handleSelectChat}
            onDelete={handleDeleteChat}
            OnEdit={handleEditChat}
          />
        ))}
      </Sidebar>

      <section className="flex flex-col w-full text-white">
        <Header
          openSidebarClick={openSidebar}
          title={chatActive ? chatActive.title : 'Nova conversa'}
          newChatClick={handleNewChat}
        />

        <ChatQuestions chat={chatActive} loading={AILoading} />

        <Footer onSendMessage={handleSendMessage} disabled={AILoading} />
      </section>
    </main>
  )
}
