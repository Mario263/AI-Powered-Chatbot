import React, { useEffect, useRef } from 'react';
import { FiTrash2, FiMessageSquare, FiPlus } from 'react-icons/fi';
import { useChat } from '../context/ChatContext';
import Message from './Message';
import TypingIndicator from './TypingIndicator';
import { scrollToBottom } from '../utils/helpers';

const ChatContainer: React.FC = () => {
  const { state, getCurrentChat, clearAllChats, createNewChat } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const currentChat = getCurrentChat();
  const messages = currentChat?.messages || [];

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom(containerRef.current);
  }, [messages, state.isLoading]);

  const handleClearAllChats = () => {
    if (window.confirm('Are you sure you want to clear all chat history? This action cannot be undone.')) {
      clearAllChats();
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      {/* Chat Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-full">
              <FiMessageSquare className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">
                {currentChat?.title || 'Olivia Chatbot'}
              </h1>
              <p className="text-sm text-gray-600">
                Powered by DeepSeek V3 • {messages.length} messages
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={createNewChat}
              className="flex items-center space-x-2 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="Start new chat"
            >
              <FiPlus className="w-4 h-4" />
              <span>New</span>
            </button>
            
            {state.chats.length > 0 && (
              <button
                onClick={handleClearAllChats}
                className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                title="Clear all chats"
              >
                <FiTrash2 className="w-4 h-4" />
                <span>Clear All</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto px-6 py-6 chat-container"
        style={{ maxHeight: 'calc(100vh - 200px)' }}
      >
        {messages.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center h-full text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <FiMessageSquare className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {currentChat ? `Start chatting in "${currentChat.title}"` : 'Start a conversation'}
            </h3>
            <p className="text-gray-600 max-w-md">
              Ask me anything! I'm here to help with questions, creative tasks, 
              problem-solving, and more.
            </p>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3 max-w-lg">
              <div className="p-3 bg-white border border-gray-200 rounded-lg">
                <p className="text-sm text-gray-700">💡 "Explain quantum computing"</p>
              </div>
              <div className="p-3 bg-white border border-gray-200 rounded-lg">
                <p className="text-sm text-gray-700">🚀 "Help me plan a project"</p>
              </div>
              <div className="p-3 bg-white border border-gray-200 rounded-lg">
                <p className="text-sm text-gray-700">📝 "Write a creative story"</p>
              </div>
              <div className="p-3 bg-white border border-gray-200 rounded-lg">
                <p className="text-sm text-gray-700">🔍 "Debug my code"</p>
              </div>
            </div>
          </div>
        ) : (
          /* Messages */
          <div className="space-y-0">
            {messages.map((message) => (
              <Message key={message.id} message={message} />
            ))}
            
            {/* Typing Indicator */}
            {state.isLoading && <TypingIndicator />}
            
            {/* Scroll anchor */}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatContainer;