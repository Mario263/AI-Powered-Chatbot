import React, { useState } from 'react';
import { FiSettings, FiChevronLeft, FiChevronRight, FiInfo, FiMessageSquare } from 'react-icons/fi';
import ApiKeyInput from './ApiKeyInput';
import ChatList from './ChatList';

const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState<'chats' | 'settings'>('chats');

  return (
    <>
      {/* Sidebar */}
      <div className={`bg-white border-r border-gray-200 transition-all duration-300 ${
        isCollapsed ? 'w-0' : 'w-80'
      }`}>
        <div className={`h-full flex flex-col ${isCollapsed ? 'hidden' : 'block'}`}>
          {/* Sidebar Header with Tabs */}
          <div className="border-b border-gray-200">
            <div className="flex items-center justify-between p-4">
              <h2 className="text-lg font-semibold text-gray-900">Olivia Chatbot</h2>
              <button
                onClick={() => setIsCollapsed(true)}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                title="Collapse sidebar"
              >
                <FiChevronLeft className="w-4 h-4 text-gray-600" />
              </button>
            </div>
            
            {/* Tab Navigation */}
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab('chats')}
                className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'chats'
                    ? 'border-blue-500 text-blue-600 bg-blue-50'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <FiMessageSquare className="w-4 h-4" />
                <span>Chats</span>
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'settings'
                    ? 'border-blue-500 text-blue-600 bg-blue-50'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <FiSettings className="w-4 h-4" />
                <span>Settings</span>
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-hidden">
            {activeTab === 'chats' ? (
              <ChatList />
            ) : (
              <div className="p-6 space-y-6 overflow-y-auto h-full">
                {/* API Key Section */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">API Configuration</h3>
                  <ApiKeyInput />
                </div>

                {/* Information Section */}
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <FiInfo className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-medium text-blue-900 mb-2">About This Chatbot</h4>
                      <div className="text-sm text-blue-800 space-y-2">
                        <p>
                          This chatbot uses OpenRouter's DeepSeek V3 model, providing intelligent 
                          conversations with advanced reasoning capabilities.
                        </p>
                        <div className="pt-2 border-t border-blue-200">
                          <h5 className="font-medium mb-1">Features:</h5>
                          <ul className="text-xs space-y-1 text-blue-700">
                            <li>• Multiple chat sessions</li>
                            <li>• Secure local API key storage</li>
                            <li>• Real-time conversations</li>
                            <li>• Chat history persistence</li>
                            <li>• Clean, modern interface</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Privacy Notice */}
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="text-sm font-medium text-green-900 mb-2">🔒 Privacy & Security</h4>
                  <div className="text-sm text-green-800 space-y-2">
                    <p>Your API key is stored locally in your browser and never transmitted to our servers.</p>
                    <p>All conversations happen directly between your browser and OpenRouter's API.</p>
                  </div>
                </div>

                {/* Technical Details */}
                <div className="text-xs text-gray-500 space-y-1">
                  <p><strong>Model:</strong> DeepSeek V3 (Free Tier)</p>
                  <p><strong>Provider:</strong> OpenRouter</p>
                  <p><strong>Built with:</strong> React + TypeScript</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Collapse/Expand Button */}
      {isCollapsed && (
        <button
          onClick={() => setIsCollapsed(false)}
          className="fixed top-4 left-4 z-10 p-2 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-all"
          title="Open settings"
        >
          <FiChevronRight className="w-4 h-4 text-gray-600" />
        </button>
      )}
    </>
  );
};

export default Sidebar;