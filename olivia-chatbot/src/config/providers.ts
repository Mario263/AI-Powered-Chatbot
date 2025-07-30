import type { ProviderConfig } from '../types';

export const API_PROVIDERS: ProviderConfig[] = [
  {
    id: 'openai',
    name: 'OpenAI',
    baseUrl: 'https://api.openai.com/v1',
    models: [
      'gpt-4o',
      'gpt-4o-mini', 
      'gpt-4-turbo',
      'gpt-4',
      'gpt-3.5-turbo'
    ],
    keyPrefix: 'sk-',
    description: 'Official OpenAI API with GPT models'
  },
  {
    id: 'anthropic',
    name: 'Anthropic',
    baseUrl: 'https://api.anthropic.com',
    models: [
      'claude-3-5-sonnet-20241022',
      'claude-3-5-haiku-20241022',
      'claude-3-opus-20240229',
      'claude-3-sonnet-20240229',
      'claude-3-haiku-20240307'
    ],
    keyPrefix: 'sk-ant-',
    description: 'Anthropic\'s Claude models'
  },
  {
    id: 'openrouter',
    name: 'OpenRouter',
    baseUrl: 'https://openrouter.ai/api/v1',
    models: [
      'anthropic/claude-3.5-sonnet',
      'openai/gpt-4o',
      'openai/gpt-4o-mini',
      'deepseek/deepseek-chat',
      'google/gemini-pro',
      'meta-llama/llama-3.1-8b-instruct:free'
    ],
    keyPrefix: 'sk-or-v1-',
    description: 'Access multiple AI models through one API'
  },
  {
    id: 'custom',
    name: 'Custom Provider',
    baseUrl: '',
    models: ['custom-model-1'],
    keyPrefix: '',
    description: 'Configure your own API endpoint'
  }
];

export const getProviderByID = (id: string): ProviderConfig | undefined => {
  return API_PROVIDERS.find(provider => provider.id === id);
};

export const validateApiKey = (key: string, provider: ProviderConfig): boolean => {
  if (!key || typeof key !== 'string') return false;
  if (!provider.keyPrefix) return key.trim().length > 0; // For custom providers
  return key.trim().startsWith(provider.keyPrefix) && key.length > provider.keyPrefix.length + 10;
};