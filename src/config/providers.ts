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
      // OpenAI Models
      'openai/gpt-4o',
      'openai/gpt-4o-mini',
      'openai/gpt-4-turbo',
      'openai/gpt-4',
      'openai/gpt-3.5-turbo',
      'openai/o1-preview',
      'openai/o1-mini',
      
      // Anthropic Models
      'anthropic/claude-3.5-sonnet',
      'anthropic/claude-3.5-haiku',
      'anthropic/claude-3-opus',
      'anthropic/claude-3-sonnet',
      'anthropic/claude-3-haiku',
      
      // Google Models
      'google/gemini-pro-1.5',
      'google/gemini-pro',
      'google/gemini-flash-1.5',
      'google/gemma-2-9b-it:free',
      'google/gemma-2-27b-it',
      
      // Meta Llama Models
      'meta-llama/llama-3.2-90b-vision-instruct',
      'meta-llama/llama-3.2-11b-vision-instruct:free',
      'meta-llama/llama-3.2-3b-instruct:free',
      'meta-llama/llama-3.2-1b-instruct:free',
      'meta-llama/llama-3.1-405b-instruct',
      'meta-llama/llama-3.1-70b-instruct',
      'meta-llama/llama-3.1-8b-instruct:free',
      'meta-llama/codellama-34b-instruct',
      
      // Qwen Models
      'qwen/qwen-2.5-72b-instruct',
      'qwen/qwen-2.5-32b-instruct',
      'qwen/qwen-2.5-14b-instruct',
      'qwen/qwen-2.5-7b-instruct:free',
      'qwen/qwen-2-72b-instruct',
      'qwen/qwen-2-vl-72b-instruct',
      'qwen/qwq-32b-preview',
      
      // Qwen Coder Models
      'qwen/qwen-2.5-coder-32b-instruct',
      'qwen/qwen-2.5-coder-14b-instruct', 
      'qwen/qwen-2.5-coder-7b-instruct',
      'qwen/qwen3-coder:free',
      'qwen/qwen2.5-coder-1.5b-instruct:free',
      
      // DeepSeek Models
      'deepseek/deepseek-chat',
      'deepseek/deepseek-coder',
      'deepseek/deepseek-r1-distill-llama-70b',
      'deepseek/deepseek-r1-distill-qwen-32b',
      'deepseek/deepseek-r1-distill-qwen-14b',
      'deepseek/deepseek-r1-distill-qwen-7b',
      
      // Mistral Models
      'mistralai/mistral-large',
      'mistralai/mistral-medium',
      'mistralai/mistral-small',
      'mistralai/mistral-7b-instruct:free',
      'mistralai/mixtral-8x7b-instruct',
      'mistralai/mixtral-8x22b-instruct',
      'mistralai/codestral-mamba',
      
      // Microsoft Models
      'microsoft/wizardlm-2-8x22b',
      'microsoft/wizardlm-2-7b',
      
      // Cohere Models
      'cohere/command-r-plus',
      'cohere/command-r',
      'cohere/command',
      
      // Perplexity Models
      'perplexity/llama-3.1-sonar-large-128k-online',
      'perplexity/llama-3.1-sonar-small-128k-online',
      'perplexity/llama-3.1-sonar-large-128k-chat',
      'perplexity/llama-3.1-sonar-small-128k-chat',
      
      // Other Notable Models
      'databricks/dbrx-instruct',
      'nvidia/llama-3.1-nemotron-70b-instruct',
      'liquid/lfm-40b:free',
      'neversleep/llama-3-lumimaid-70b',
      'cognitivecomputations/dolphin-2.6-mixtral-8x7b',
      'huggingfaceh4/zephyr-7b-beta:free',
      'openchat/openchat-7b:free',
      'gryphe/mythomist-7b:free',
      'undi95/toppy-m-7b:free',
      'openhermes-2.5-mistral-7b:free',
      
      // Specialized Models
      'phind/phind-codellama-34b',
      'fireworks/firellava-13b',
      'lynn/soliloquy-l3',
      'sao10k/fimbulvetr-11b-v2',
      'pygmalionai/mythalion-13b',
      'xwin-lm/xwin-lm-70b',
      
      // Free Tier Models (clearly marked)
      'nousresearch/hermes-3-llama-3.1-405b:free',
      'nousresearch/hermes-2-theta-llama-3-8b:free',
      'teknium/openhermes-2-mistral-7b:free',
      'intel/neural-chat-7b:free',
      'togethercomputer/redpajama-incite-7b-chat:free'
    ],
    keyPrefix: 'sk-or-v1-',
    description: 'Access 80+ AI models including GPT-4, Claude, Llama, Qwen, and many more'
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