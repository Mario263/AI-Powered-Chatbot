import React, { useState } from 'react';
import { FiUser, FiCpu, FiCopy, FiCheck } from 'react-icons/fi';
import type { Message as MessageType } from '../types';
import { formatTimestamp, copyToClipboard } from '../utils/helpers';

interface MessageProps {
  message: MessageType;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === 'user';

  const handleCopy = async () => {
    const success = await copyToClipboard(message.content);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 chat-message`}>
      <div className={`flex max-w-[80%] ${isUser ? 'flex-row-reverse space-x-reverse space-x-3' : 'flex-row space-x-3'}`}>
        {/* Avatar */}
        <div
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
            isUser 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 text-gray-600'
          }`}
        >
          {isUser ? (
            <FiUser className="w-4 h-4" />
          ) : (
            <FiCpu className="w-4 h-4" />
          )}
        </div>

        {/* Message bubble */}
        <div className={`${isUser ? 'mr-3' : 'ml-3'}`}>
          <div
            className={`relative px-4 py-3 rounded-2xl group ${
              isUser
                ? 'bg-blue-600 text-white rounded-br-md'
                : 'bg-white border border-gray-200 text-gray-900 rounded-bl-md shadow-sm'
            }`}
          >
            {/* Message content */}
            <div className="text-sm leading-relaxed whitespace-pre-wrap">
              {message.content}
            </div>

            {/* Copy button */}
            <button
              onClick={handleCopy}
              className={`absolute top-2 right-2 p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity ${
                isUser
                  ? 'hover:bg-blue-700 text-blue-200 hover:text-white'
                  : 'hover:bg-gray-100 text-gray-400 hover:text-gray-600'
              }`}
              title="Copy message"
            >
              {copied ? (
                <FiCheck className="w-3 h-3" />
              ) : (
                <FiCopy className="w-3 h-3" />
              )}
            </button>
          </div>

          {/* Timestamp */}
          <div
            className={`mt-1 text-xs text-gray-500 ${
              isUser ? 'text-right' : 'text-left'
            }`}
          >
            {formatTimestamp(message.timestamp)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;