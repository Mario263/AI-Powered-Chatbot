export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export interface Chat {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export type ApiProvider = 'openai' | 'anthropic' | 'openrouter' | 'custom';

export interface ChatSettings {
  apiKey: string;
  provider: ApiProvider;
  baseUrl?: string;
  model: string;
  temperature: number;
  maxTokens: number;
}

export interface ProviderConfig {
  id: ApiProvider;
  name: string;
  baseUrl: string;
  models: string[];
  keyPrefix: string;
  description: string;
}

export interface ChatState {
  chats: Chat[];
  currentChatId: string | null;
  isLoading: boolean;
  error: string | null;
  settings: ChatSettings;
}

export interface ApiError {
  message: string;
  type: string;
  code?: string;
}

export type ChatbotPersonality = 'helpful' | 'creative' | 'professional' | 'casual';