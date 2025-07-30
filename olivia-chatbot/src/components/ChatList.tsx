import React from 'react';
import { FiMessageSquare, FiTrash2, FiPlus } from 'react-icons/fi';
import { formatTimestamp } from '../utils/helpers';
import { useChat } from '../context/ChatContext';

const ChatList: React.FC = () => {
  const { state, createNewChat, selectChat, deleteChat } = useChat();

  const handleChatSelect = (chatId: string) => {
    selectChat(chatId);
  };

  const handleDeleteChat = (e: React.MouseEvent, chatId: string) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this chat?')) {
      deleteChat(chatId);
    }
  };

  const formatChatTime = (date: Date): string => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) {
      return formatTimestamp(date);
    } else if (days === 1) {
      return 'Yesterday';
    } else if (days < 7) {
      return `${days} days ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header with New Chat button */}
      <div className="p-4 border-b border-gray-200">
        <button
          onClick={createNewChat}
          className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <FiPlus className="w-4 h-4" />
          <span>New Chat</span>
        </button>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {state.chats.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            <FiMessageSquare className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <p className="text-sm">No chats yet</p>
            <p className="text-xs text-gray-400 mt-1">Start a new conversation</p>
          </div>
        ) : (
          <div className="p-2 space-y-1">
            {state.chats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => handleChatSelect(chat.id)}
                className={`group relative p-3 rounded-lg cursor-pointer transition-colors ${
                  state.currentChatId === chat.id
                    ? 'bg-blue-50 border border-blue-200'
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h3
                      className={`text-sm font-medium truncate ${
                        state.currentChatId === chat.id
                          ? 'text-blue-900'
                          : 'text-gray-900'
                      }`}
                    >
                      {chat.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatChatTime(chat.updatedAt)} • {chat.messages.length} messages
                    </p>
                  </div>
                  
                  {/* Delete button */}
                  <button
                    onClick={(e) => handleDeleteChat(e, chat.id)}
                    className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-100 rounded text-red-500 hover:text-red-700 transition-all"
                    title="Delete chat"
                  >
                    <FiTrash2 className="w-3 h-3" />
                  </button>
                </div>

                {/* Preview of last message */}
                {chat.messages.length > 0 && (
                  <div className="mt-2 text-xs text-gray-400 truncate">
                    {chat.messages[chat.messages.length - 1].content}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatList;