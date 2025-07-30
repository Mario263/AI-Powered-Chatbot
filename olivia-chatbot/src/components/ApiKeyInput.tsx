import React, { useState } from 'react';
import { FiEye, FiEyeOff, FiKey, FiCheck } from 'react-icons/fi';
import { useChat } from '../context/ChatContext';
import { validateApiKey, maskApiKey } from '../utils/helpers';

const ApiKeyInput: React.FC = () => {
  const { state, setApiKey, isApiKeySet } = useChat();
  const [inputValue, setInputValue] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [isEditing, setIsEditing] = useState(!isApiKeySet());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateApiKey(inputValue)) {
      setApiKey(inputValue);
      setIsEditing(false);
      setInputValue('');
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setInputValue(state.settings.apiKey);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setInputValue('');
  };

  if (!isEditing && isApiKeySet()) {
    return (
      <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-green-100 rounded-full">
            <FiCheck className="w-4 h-4 text-green-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-green-800">API Key Connected</p>
            <p className="text-xs text-green-600">
              {maskApiKey(state.settings.apiKey)}
            </p>
          </div>
        </div>
        <button
          onClick={handleEdit}
          className="px-3 py-1 text-sm text-green-700 hover:bg-green-100 rounded-md transition-colors"
        >
          Edit
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
      <div className="flex items-center space-x-2 mb-3">
        <FiKey className="w-5 h-5 text-gray-600" />
        <h3 className="text-sm font-medium text-gray-900">OpenRouter API Key</h3>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="relative">
          <input
            type={showKey ? 'text' : 'password'}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="sk-or-v1-..."
            className="w-full px-3 py-2 pr-10 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          <button
            type="button"
            onClick={() => setShowKey(!showKey)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showKey ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
          </button>
        </div>
        
        <div className="text-xs text-gray-500">
          Your API key is stored locally in your browser and never sent to our servers.
        </div>
        
        <div className="flex space-x-2">
          <button
            type="submit"
            disabled={!validateApiKey(inputValue)}
            className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Save API Key
          </button>
          {isApiKeySet() && (
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ApiKeyInput;