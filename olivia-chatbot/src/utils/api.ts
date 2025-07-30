import OpenAI from 'openai';
import type { Message } from '../types';

const OPENROUTER_BASE_URL = 'https://openrouter.ai/api/v1';
const MODEL_NAME = 'deepseek/deepseek-chat-v3-0324:free';

export class ChatAPI {
  private client: OpenAI | null = null;

  constructor(apiKey?: string) {
    if (apiKey) {
      this.initializeClient(apiKey);
    }
  }

  private initializeClient(apiKey: string): void {
    this.client = new OpenAI({
      baseURL: OPENROUTER_BASE_URL,
      apiKey,
      dangerouslyAllowBrowser: true, // Required for browser usage
    });
  }

  public setApiKey(apiKey: string): void {
    this.initializeClient(apiKey);
  }

  public async sendMessage(
    messages: Message[],
    options: {
      temperature?: number;
      maxTokens?: number;
      stream?: boolean;
    } = {}
  ): Promise<string> {
    if (!this.client) {
      throw new Error('API client not initialized. Please set an API key.');
    }

    try {
      const { temperature = 0.7, maxTokens = 1000 } = options;

      // Convert our Message format to OpenAI format
      const openAIMessages = messages.map(msg => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content,
      }));

      const completion = await this.client.chat.completions.create({
        model: MODEL_NAME,
        messages: openAIMessages,
        temperature,
        max_tokens: maxTokens,
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
    options: {
      temperature?: number;
      maxTokens?: number;
    } = {}
  ): AsyncGenerator<string, void, unknown> {
    if (!this.client) {
      throw new Error('API client not initialized. Please set an API key.');
    }

    try {
      const { temperature = 0.7, maxTokens = 1000 } = options;

      const openAIMessages = messages.map(msg => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content,
      }));

      const stream = await this.client.chat.completions.create({
        model: MODEL_NAME,
        messages: openAIMessages,
        temperature,
        max_tokens: maxTokens,
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

// Singleton instance with the provided API key
export const chatAPI = new ChatAPI('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');