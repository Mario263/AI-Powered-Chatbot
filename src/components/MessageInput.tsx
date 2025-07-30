import React, { useState, useRef, useEffect } from 'react';
import { FiSend, FiCornerDownLeft } from 'react-icons/fi';
import { useChat } from '../context/ChatContext';

const MessageInput: React.FC = () => {
  const { sendMessage, state, isApiKeySet } = useChat();
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || state.isLoading || !isApiKeySet()) return;

    const message = input.trim();
    setInput('');
    await sendMessage(message);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  const canSend = input.trim() && !state.isLoading && isApiKeySet();

  if (!isApiKeySet()) {
    return (
      <div className="p-4 bg-gray-50 border-t border-gray-200 text-center">
        <p className="text-sm text-gray-600">
          Please set your OpenRouter API key to start chatting
        </p>
      </div>
    );
  }

  return (
    <div className="border-t border-gray-200 bg-white p-4">
      <form onSubmit={handleSubmit} className="flex items-end space-x-3">
        {/* Message Input */}
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={state.isLoading ? "AI is responding..." : "Type your message..."}
            disabled={state.isLoading}
            className="w-full px-4 py-3 pr-12 text-sm border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none max-h-32 disabled:bg-gray-50 disabled:text-gray-500"
            rows={1}
          />
          
          {/* Keyboard hint */}
          <div className="absolute right-3 bottom-3 text-xs text-gray-400 flex items-center space-x-1">
            <FiCornerDownLeft className="w-3 h-3" />
            <span>Send</span>
          </div>
        </div>

        {/* Send Button */}
        <button
          type="submit"
          disabled={!canSend}
          className={`p-3 rounded-full transition-all duration-200 ${
            canSend
              ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transform hover:scale-105'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          title={canSend ? 'Send message' : 'Enter a message to send'}
        >
          <FiSend className="w-4 h-4" />
        </button>
      </form>

      {/* Error Display */}
      {state.error && (
        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-700">{state.error}</p>
        </div>
      )}

      {/* Usage Info */}
      <div className="mt-2 text-xs text-gray-500 text-center">
        Press <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs">Enter</kbd> to send, 
        <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs ml-1">Shift + Enter</kbd> for new line
      </div>
    </div>
  );
};

export default MessageInput;