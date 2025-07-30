import type { Message, Chat } from '../types';

export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const createMessage = (
  content: string,
  role: 'user' | 'assistant'
): Message => ({
  id: generateId(),
  content: content.trim(),
  role,
  timestamp: new Date(),
});

export const createChat = (title?: string): Chat => ({
  id: generateId(),
  title: title || 'New Chat',
  messages: [],
  createdAt: new Date(),
  updatedAt: new Date(),
});

export const generateChatTitle = (firstMessage: string): string => {
  const maxLength = 50;
  const cleaned = firstMessage.trim().replace(/\n/g, ' ');
  if (cleaned.length <= maxLength) {
    return cleaned;
  }
  return cleaned.substring(0, maxLength).trim() + '...';
};

export const formatTimestamp = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).format(date);
};

export const scrollToBottom = (element: HTMLElement | null): void => {
  if (element) {
    element.scrollTop = element.scrollHeight;
  }
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const validateApiKey = (key: string, providerKey?: string): boolean => {
  if (!key || typeof key !== 'string') return false;
  
  // Basic validation for any key
  const trimmed = key.trim();
  if (trimmed.length < 10) return false;
  
  // Provider-specific validation
  if (providerKey) {
    switch (providerKey) {
      case 'openai':
        return trimmed.startsWith('sk-');
      case 'anthropic':
        return trimmed.startsWith('sk-ant-');
      case 'openrouter':
        return trimmed.startsWith('sk-or-v1-');
      default:
        return trimmed.length > 0;
    }
  }
  
  return trimmed.length > 0;
};

export const maskApiKey = (key: string): string => {
  if (!key || key.length < 10) return key;
  return `${key.slice(0, 6)}...${key.slice(-4)}`;
};

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
};

export const isValidUrl = (string: string): boolean => {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
};