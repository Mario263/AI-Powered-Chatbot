import React from 'react';
import { FiKey, FiShield, FiZap } from 'react-icons/fi';
import ApiKeyInput from './ApiKeyInput';

const SetupScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiKey className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome to Olivia Chatbot
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            To get started, please configure your AI provider and API key
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="text-center p-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <FiShield className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Secure & Private</h3>
            <p className="text-sm text-gray-600">
              Your API key stays in your browser. No data sent to our servers.
            </p>
          </div>
          
          <div className="text-center p-4">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <FiZap className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Multiple Providers</h3>
            <p className="text-sm text-gray-600">
              Works with OpenAI, Anthropic, OpenRouter, and more.
            </p>
          </div>
          
          <div className="text-center p-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <FiKey className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Easy Setup</h3>
            <p className="text-sm text-gray-600">
              Just enter your API key and start chatting in seconds.
            </p>
          </div>
        </div>

        {/* API Configuration Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <ApiKeyInput />
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>
            Built with React + TypeScript • Open source • 
            <a 
              href="https://github.com/your-repo/olivia-chatbot" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline ml-1"
            >
              View on GitHub
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SetupScreen;