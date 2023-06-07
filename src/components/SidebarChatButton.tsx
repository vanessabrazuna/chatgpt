import { useState } from 'react'
import { Chat } from '@/types/Chat'
import { Check, Edit3, MessageSquare, Trash, X } from 'lucide-react'

type SidebarChatButtonProps = {
  chatItem: Chat
  active: boolean
  onClick: (id: string) => void
  onDelete: (id: string) => void
  OnEdit: (id: string, newTitle: string) => void
}

export function SidebarChatButton({
  chatItem,
  active,
  onClick,
  onDelete,
  OnEdit
}: SidebarChatButtonProps) {
  const [deleting, setDeleting] = useState(false)
  const [editing, setEditing] = useState(false)
  const [titleInput, setTitleInput] = useState(chatItem.title)

  function handleClickButton() {
    if(!deleting || !editing) {
      onClick(chatItem.id)
    }
  }

  function handleConfirmButton() {
    if(deleting) onDelete(chatItem.id)

    if(editing && titleInput.trim() !== '') {
      OnEdit(chatItem.id, titleInput.trim())
    }

    setDeleting(false)
    setEditing(false)
  }

  function handleCancelButton() {
    setDeleting(false)
    setEditing(false)
  }

  return (
    <div
      className={`flex items-center rounded-md p-3 text-sm cursor-pointer
      hover:bg-gray-500/10 ${active ? 'bg-gray-500/20' : 'bg-transparent'}`}
      onClick={handleClickButton}
    >
      <div className="mr-3">
        {!deleting && <MessageSquare size="16" />}
        {deleting && <Trash size="16" />}
      </div>

      <div className="flex-1 text-sm overflow-x-hidden">
        {editing && (
          <input
            className="w-full bg-transparent text-sm outline-none 
              border border-blue-500"
            value={titleInput}
            onChange={e => setTitleInput(e.target.value)}
          />
        )}
        {!editing && (
          <div className="border border-transparent truncate">
            {!deleting && chatItem.title}
            {deleting && `Delete ${chatItem.title}`}
          </div>
        )}
      </div>

      {active && !deleting && !editing && (
        <div className="flex">
          <div
            className="cursor-pointer mx-1 opacity-60 hover:opacity-100"
            onClick={() => setEditing(true)}
          >
            <Edit3 size={16} />
          </div>

          <div
            className="cursor-pointer mx-1 opacity-60 hover:opacity-100"
            onClick={() => setDeleting(true)}
          >
            <Trash size={16} />
          </div>
        </div>
      )}

      {(deleting || editing) && (
        <div className="flex">
          <div
            className="cursor-pointer mx-1 opacity-60 hover:opacity-100"
            onClick={handleConfirmButton}
          >
            <Check size={16} />
          </div>
          <div
            className="cursor-pointer mx-1 opacity-60 hover:opacity-100"
            onClick={handleCancelButton}
          >
            <X size={16} />
          </div>
        </div>
      )}
    </div>
  )
}
