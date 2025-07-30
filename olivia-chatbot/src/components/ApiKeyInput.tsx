import React, { useState } from 'react';
import { FiEye, FiEyeOff, FiKey, FiCheck, FiAlertCircle } from 'react-icons/fi';
import { useChat } from '../context/ChatContext';
import { validateApiKey, maskApiKey } from '../utils/helpers';
import { API_PROVIDERS, getProviderByID } from '../config/providers';
import type { ApiProvider } from '../types';

const ApiKeyInput: React.FC = () => {
  const { state, dispatch, isApiKeySet } = useChat();
  const [inputValue, setInputValue] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [isEditing, setIsEditing] = useState(!isApiKeySet());
  const [selectedProvider, setSelectedProvider] = useState<ApiProvider>(state.settings.provider);
  const [selectedModel, setSelectedModel] = useState(state.settings.model);

  const currentProvider = getProviderByID(selectedProvider);
  const isValidKey = inputValue ? validateApiKey(inputValue, selectedProvider) : false;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValidKey && currentProvider) {
      dispatch({ 
        type: 'UPDATE_SETTINGS', 
        payload: { 
          apiKey: inputValue,
          provider: selectedProvider,
          model: selectedModel,
          baseUrl: currentProvider.baseUrl
        } 
      });
      setIsEditing(false);
      setInputValue('');
    }
  };

  const handleProviderChange = (provider: ApiProvider) => {
    setSelectedProvider(provider);
    const providerConfig = getProviderByID(provider);
    if (providerConfig && providerConfig.models.length > 0) {
      setSelectedModel(providerConfig.models[0]);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setInputValue(state.settings.apiKey);
    setSelectedProvider(state.settings.provider);
    setSelectedModel(state.settings.model);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setInputValue('');
    setSelectedProvider(state.settings.provider);
    setSelectedModel(state.settings.model);
  };

  if (!isEditing && isApiKeySet()) {
    return (
      <div className="space-y-4">
        {/* Connected Status */}
        <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-full">
              <FiCheck className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-green-800">API Connected</p>
              <p className="text-xs text-green-600">
                {getProviderByID(state.settings.provider)?.name} • {maskApiKey(state.settings.apiKey)}
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

        {/* Current Model */}
        <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
          <p className="text-xs text-gray-500 mb-1">Current Model</p>
          <p className="text-sm font-medium text-gray-900">{state.settings.model}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center space-x-2 mb-4">
        <FiKey className="w-5 h-5 text-gray-600" />
        <h3 className="text-sm font-medium text-gray-900">API Configuration</h3>
      </div>

      {/* API Provider Selection */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-2">
          AI Provider
        </label>
        <div className="grid grid-cols-2 gap-2">
          {API_PROVIDERS.filter(p => p.id !== 'custom').map((provider) => (
            <button
              key={provider.id}
              type="button"
              onClick={() => handleProviderChange(provider.id)}
              className={`p-3 text-left border rounded-lg transition-all ${
                selectedProvider === provider.id
                  ? 'border-blue-500 bg-blue-50 text-blue-900'
                  : 'border-gray-200 hover:border-gray-300 text-gray-700'
              }`}
            >
              <div className="font-medium text-sm">{provider.name}</div>
              <div className="text-xs text-gray-500 mt-1">{provider.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Model Selection */}
      {currentProvider && (
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-2">
            Model
          </label>
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {currentProvider.models.map((model) => (
              <option key={model} value={model}>
                {model}
              </option>
            ))}
          </select>
        </div>
      )}
      
      {/* API Key Input */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-2">
            API Key
          </label>
          <div className="relative">
            <input
              type={showKey ? 'text' : 'password'}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={currentProvider?.keyPrefix ? `${currentProvider.keyPrefix}...` : 'Enter your API key'}
              className={`w-full px-3 py-2 pr-10 text-sm border rounded-md focus:outline-none focus:ring-2 focus:border-transparent ${
                inputValue && !isValidKey
                  ? 'border-red-300 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-blue-500'
              }`}
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
          
          {inputValue && !isValidKey && (
            <div className="mt-2 flex items-center space-x-2 text-red-600">
              <FiAlertCircle className="w-4 h-4" />
              <p className="text-xs">Invalid API key format for {currentProvider?.name}</p>
            </div>
          )}
        </div>
        
        <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-md">
          <p className="font-medium mb-1">🔒 Security Notice</p>
          <p>Your API key is stored locally in your browser and never sent to our servers. All AI requests go directly to {currentProvider?.name}.</p>
        </div>
        
        <div className="flex space-x-2">
          <button
            type="submit"
            disabled={!isValidKey}
            className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Save Configuration
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

      {/* Help Text */}
      {currentProvider && (
        <div className="text-xs text-gray-500 space-y-1">
          <p><strong>Where to get your {currentProvider.name} API key:</strong></p>
          {currentProvider.id === 'openai' && (
            <p>• Visit <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">platform.openai.com/api-keys</a></p>
          )}
          {currentProvider.id === 'anthropic' && (
            <p>• Visit <a href="https://console.anthropic.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">console.anthropic.com</a></p>
          )}
          {currentProvider.id === 'openrouter' && (
            <p>• Visit <a href="https://openrouter.ai/keys" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">openrouter.ai/keys</a></p>
          )}
        </div>
      )}
    </div>
  );
};

export default ApiKeyInput;