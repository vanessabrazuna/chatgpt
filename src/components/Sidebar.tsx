import { ReactNode } from "react";
import { X, Plus, Trash } from "lucide-react";

import { SidebarButton } from './SidebarButton'

type SidebarProps = {
  children: ReactNode;
  open: boolean;
  onClose: () => void;
  onClear: () => void;
};

export function Sidebar({ open, onClose, onClear, children }: SidebarProps) {
  return (
    <section
      className={`fixed left-0 top-0 bottom-0 text-white 
        ${open ? "w-screen bg-gray-600/75" : "w-0"} md:w-64 md:static`}
    >
      <div 
        className={`transition-all duration-300 flex h-screen 
          ${open ? 'ml=0' : '-ml-96'} md:ml-0`}
        >
        <div className="flex flex-col w-64 p-2 bg-gray-900">
          <div className="flex items-center p-3 rounded-md text-sm cursor-pointer border border-white/20 hover:bg-gray-500/20">
            <Plus
              className="mr-3"
              size={16}
            />
            Nova conversa
          </div>

          <nav className="flex-1 pt-2 overflow-y-auto">
            {children}
          </nav>

          <div className="border-t border-gray-700 pt-2">
            <SidebarButton
              icon={<Trash size={16} />}
              label="Limpar todas as conversas"
              onClick={onClear} 
            />
          </div>
        </div>
        <div
          onClick={onClose}
          className="flex justify-center items-center w-10 h-10 cursor-pointer     md:hidden"
        >
          <X size={24} />
        </div>
      </div>
    </section>
  );
}
