import { Menu, Plus } from 'lucide-react'

type HeaderProps = {
  title: string
  openSidebarClick: () => void
  newChatClick: () => void
}

export function Header({ title, openSidebarClick, newChatClick }: HeaderProps) {
  return (
    <header
      className="flex justify-beteween items-center w-full 
        border-b border-gray-600 p-2 md:hidden"
    >
      <div onClick={openSidebarClick}>
        <Menu size={24} className='text-white'/>
      </div>

      <div className="mx-2 truncate">{title}</div>

      <div onClick={newChatClick}>
        <Plus size={24} className='text-white' />
      </div>
    </header>
  )
}
