import OpenAI from 'openai';
import type { Message, ChatSettings } from '../types';
import { getProviderByID } from '../config/providers';

export class ChatAPI {
  private client: OpenAI | null = null;

  constructor() {
    // No default initialization - require explicit setup
  }

  private initializeClient(settings: ChatSettings): void {
    const provider = getProviderByID(settings.provider);
    if (!provider) {
      throw new Error(`Unsupported provider: ${settings.provider}`);
    }

    const baseUrl = settings.baseUrl || provider.baseUrl;
    
    // Handle Anthropic differently as it uses a different SDK approach
    if (settings.provider === 'anthropic') {
      // For Anthropic, we'll still use OpenAI SDK but with custom headers
      this.client = new OpenAI({
        baseURL: baseUrl + '/v1', // Anthropic compatibility layer
        apiKey: settings.apiKey,
        dangerouslyAllowBrowser: true,
        defaultHeaders: {
          'anthropic-version': '2023-06-01',
        },
      });
    } else {
      this.client = new OpenAI({
        baseURL: baseUrl,
        apiKey: settings.apiKey,
        dangerouslyAllowBrowser: true,
      });
    }

  }

  public updateSettings(settings: ChatSettings): void {
    if (!settings.apiKey) {
      this.client = null;
      return;
    }
    this.initializeClient(settings);
  }

  public async sendMessage(
    messages: Message[],
    settings: ChatSettings
  ): Promise<string> {
    if (!this.client) {
      throw new Error('API client not initialized. Please set an API key.');
    }

    // Ensure client is initialized with current settings
    this.updateSettings(settings);

    try {
      // Convert our Message format to OpenAI format
      const openAIMessages = messages.map(msg => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content,
      }));

      const completion = await this.client.chat.completions.create({
        model: settings.model,
        messages: openAIMessages,
        temperature: settings.temperature,
        max_tokens: settings.maxTokens,
      });

      const response = completion.choices[0]?.message?.content;
      
      if (!response) {
        throw new Error('No response received from the API');
      }

      return response;
    } catch (error: any) {
      console.error('API Error:', error);
      
      // Handle different types of errors
      if (error?.error?.type === 'invalid_request_error') {
        throw new Error(`Invalid request: ${error.error.message}`);
      } else if (error?.error?.type === 'authentication_error') {
        throw new Error('Invalid API key. Please check your OpenRouter API key.');
      } else if (error?.error?.type === 'insufficient_quota') {
        throw new Error('API quota exceeded. Please check your OpenRouter account.');
      } else if (error?.message?.includes('fetch')) {
        throw new Error('Network error. Please check your internet connection.');
      } else {
        throw new Error(error?.message || 'An unexpected error occurred');
      }
    }
  }

  public async *sendMessageStream(
    messages: Message[],
    settings: ChatSettings
  ): AsyncGenerator<string, void, unknown> {
    if (!this.client) {
      throw new Error('API client not initialized. Please set an API key.');
    }

    // Ensure client is initialized with current settings
    this.updateSettings(settings);

    try {
      const openAIMessages = messages.map(msg => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content,
      }));

      const stream = await this.client.chat.completions.create({
        model: settings.model,
        messages: openAIMessages,
        temperature: settings.temperature,
        max_tokens: settings.maxTokens,
        stream: true,
      });

      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content;
        if (content) {
          yield content;
        }
      }
    } catch (error: any) {
      console.error('Stream API Error:', error);
      throw new Error(error?.message || 'Streaming failed');
    }
  }

  public isInitialized(): boolean {
    return this.client !== null;
  }
}

// Singleton instance - no default initialization
export const chatAPI = new ChatAPI();