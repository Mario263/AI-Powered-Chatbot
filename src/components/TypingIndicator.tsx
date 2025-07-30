import React from 'react';
import { FiCpu } from 'react-icons/fi';

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex justify-start mb-4 animate-fade-in">
      <div className="flex max-w-[80%] flex-row space-x-3">
        {/* Avatar */}
        <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 text-gray-600">
          <FiCpu className="w-4 h-4" />
        </div>

        {/* Typing bubble */}
        <div className="ml-3">
          <div className="bg-white border border-gray-200 text-gray-900 rounded-2xl rounded-bl-md shadow-sm px-4 py-3">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
          
          <div className="mt-1 text-xs text-gray-500 text-left">
            AI is thinking...
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;