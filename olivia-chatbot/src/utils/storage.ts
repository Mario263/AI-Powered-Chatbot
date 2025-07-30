import type { ChatSettings, Chat } from '../types';

const STORAGE_KEYS = {
  API_KEY: 'olivia_chatbot_api_key',
  SETTINGS: 'olivia_chatbot_settings',
  CHATS: 'olivia_chatbot_chats',
  CURRENT_CHAT_ID: 'olivia_chatbot_current_chat_id',
} as const;

export const storage = {
  // API Key management
  setApiKey: (key: string): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.API_KEY, key);
    } catch (error) {
      console.error('Failed to save API key:', error);
    }
  },

  getApiKey: (): string | null => {
    try {
      return localStorage.getItem(STORAGE_KEYS.API_KEY);
    } catch (error) {
      console.error('Failed to retrieve API key:', error);
      return null;
    }
  },

  removeApiKey: (): void => {
    try {
      localStorage.removeItem(STORAGE_KEYS.API_KEY);
    } catch (error) {
      console.error('Failed to remove API key:', error);
    }
  },

  // Settings management
  setSettings: (settings: Partial<ChatSettings>): void => {
    try {
      const currentSettings = storage.getSettings();
      const updatedSettings = { ...currentSettings, ...settings };
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updatedSettings));
    } catch (error) {
      console.error('Failed to save settings:', error);
    }
  },

  getSettings: (): Partial<ChatSettings> => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.error('Failed to retrieve settings:', error);
      return {};
    }
  },

  // Chat management
  saveChats: (chats: Chat[]): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.CHATS, JSON.stringify(chats));
    } catch (error) {
      console.error('Failed to save chats:', error);
    }
  },

  getChats: (): Chat[] => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CHATS);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Failed to retrieve chats:', error);
      return [];
    }
  },

  saveCurrentChatId: (chatId: string | null): void => {
    try {
      if (chatId) {
        localStorage.setItem(STORAGE_KEYS.CURRENT_CHAT_ID, chatId);
      } else {
        localStorage.removeItem(STORAGE_KEYS.CURRENT_CHAT_ID);
      }
    } catch (error) {
      console.error('Failed to save current chat ID:', error);
    }
  },

  getCurrentChatId: (): string | null => {
    try {
      return localStorage.getItem(STORAGE_KEYS.CURRENT_CHAT_ID);
    } catch (error) {
      console.error('Failed to retrieve current chat ID:', error);
      return null;
    }
  },

  clearAllChats: (): void => {
    try {
      localStorage.removeItem(STORAGE_KEYS.CHATS);
      localStorage.removeItem(STORAGE_KEYS.CURRENT_CHAT_ID);
    } catch (error) {
      console.error('Failed to clear chats:', error);
    }
  },

  // Utility functions
  isApiKeyValid: (key: string): boolean => {
    return Boolean(key && key.trim().length > 0 && key.startsWith('sk-or-v1-'));
  },

  clearAll: (): void => {
    try {
      Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key);
      });
    } catch (error) {
      console.error('Failed to clear storage:', error);
    }
  }
};