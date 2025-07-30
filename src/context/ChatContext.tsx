import React, { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react';
import type { Message, Chat, ChatState, ChatSettings } from '../types';
import { storage } from '../utils/storage';
import { chatAPI } from '../utils/api';
import { createMessage, createChat, generateChatTitle } from '../utils/helpers';

// Action types
type ChatAction =
  | { type: 'SET_CHATS'; payload: Chat[] }
  | { type: 'ADD_CHAT'; payload: Chat }
  | { type: 'UPDATE_CHAT'; payload: { chatId: string; updates: Partial<Chat> } }
  | { type: 'DELETE_CHAT'; payload: string }
  | { type: 'SET_CURRENT_CHAT'; payload: string | null }
  | { type: 'ADD_MESSAGE'; payload: { chatId: string; message: Message } }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'UPDATE_SETTINGS'; payload: Partial<ChatSettings> }
  | { type: 'CLEAR_ALL_CHATS' }
  | { type: 'SET_API_KEY'; payload: string };

// Initial state
const initialState: ChatState = {
  chats: [],
  currentChatId: null,
  isLoading: false,
  error: null,
  settings: {
    apiKey: '',
    provider: 'openai',
    model: 'gpt-4o-mini',
    temperature: 0.7,
    maxTokens: 1000,
  },
};

// Reducer
const chatReducer = (state: ChatState, action: ChatAction): ChatState => {
  switch (action.type) {
    case 'SET_CHATS':
      return { ...state, chats: action.payload };
    
    case 'ADD_CHAT':
      return { 
        ...state, 
        chats: [action.payload, ...state.chats],
        currentChatId: action.payload.id,
        error: null 
      };
    
    case 'UPDATE_CHAT':
      return {
        ...state,
        chats: state.chats.map(chat =>
          chat.id === action.payload.chatId
            ? { ...chat, ...action.payload.updates, updatedAt: new Date() }
            : chat
        )
      };
    
    case 'DELETE_CHAT':
      const filteredChats = state.chats.filter(chat => chat.id !== action.payload);
      return {
        ...state,
        chats: filteredChats,
        currentChatId: state.currentChatId === action.payload 
          ? (filteredChats.length > 0 ? filteredChats[0].id : null)
          : state.currentChatId
      };
    
    case 'SET_CURRENT_CHAT':
      return { ...state, currentChatId: action.payload, error: null };
    
    case 'ADD_MESSAGE':
      return {
        ...state,
        chats: state.chats.map(chat =>
          chat.id === action.payload.chatId
            ? { 
                ...chat, 
                messages: [...chat.messages, action.payload.message],
                updatedAt: new Date()
              }
            : chat
        ),
        error: null
      };
    
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false };
    
    case 'UPDATE_SETTINGS':
      return { 
        ...state, 
        settings: { ...state.settings, ...action.payload } 
      };
    
    case 'CLEAR_ALL_CHATS':
      return { ...state, chats: [], currentChatId: null, error: null };
    
    case 'SET_API_KEY':
      return {
        ...state,
        settings: { ...state.settings, apiKey: action.payload },
        error: null
      };
    
    default:
      return state;
  }
};

// Context
interface ChatContextType {
  state: ChatState;
  dispatch: React.Dispatch<ChatAction>;
  // Chat management
  createNewChat: () => void;
  deleteChat: (chatId: string) => void;
  selectChat: (chatId: string) => void;
  getCurrentChat: () => Chat | null;
  // Messaging
  sendMessage: (content: string) => Promise<void>;
  // Settings
  setApiKey: (key: string) => void;
  isApiKeySet: () => boolean;
  // Utilities
  clearAllChats: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

// Provider component
interface ChatProviderProps {
  children: ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  // Load persisted data on mount
  useEffect(() => {
    const savedApiKey = storage.getApiKey();
    const savedSettings = storage.getSettings();
    const savedChats = storage.getChats();
    const savedCurrentChatId = storage.getCurrentChatId();

    // Load saved settings and merge with defaults
    const settingsToLoad = {
      ...initialState.settings,
      ...savedSettings,
    };

    // Only set API key if one was saved
    if (savedApiKey) {
      settingsToLoad.apiKey = savedApiKey;
    }

    dispatch({ type: 'UPDATE_SETTINGS', payload: settingsToLoad });

    if (savedChats && savedChats.length > 0) {
      const parsedChats = savedChats.map(chat => ({
        ...chat,
        createdAt: new Date(chat.createdAt),
        updatedAt: new Date(chat.updatedAt),
        messages: chat.messages.map(msg => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }))
      }));
      dispatch({ type: 'SET_CHATS', payload: parsedChats });
      
      // Set current chat if valid
      if (savedCurrentChatId && parsedChats.some(chat => chat.id === savedCurrentChatId)) {
        dispatch({ type: 'SET_CURRENT_CHAT', payload: savedCurrentChatId });
      } else if (parsedChats.length > 0) {
        dispatch({ type: 'SET_CURRENT_CHAT', payload: parsedChats[0].id });
      }
    }
  }, []);

  // Persist chats when they change
  useEffect(() => {
    if (state.chats.length > 0) {
      storage.saveChats(state.chats);
    }
  }, [state.chats]);

  // Persist current chat ID when it changes
  useEffect(() => {
    storage.saveCurrentChatId(state.currentChatId);
  }, [state.currentChatId]);

  // Persist settings when they change
  useEffect(() => {
    storage.setSettings(state.settings);
  }, [state.settings]);

  // Update API client when settings change
  useEffect(() => {
    chatAPI.updateSettings(state.settings);
  }, [state.settings]);

  // Chat management functions
  const createNewChat = (): void => {
    const newChat = createChat();
    dispatch({ type: 'ADD_CHAT', payload: newChat });
  };

  const deleteChat = (chatId: string): void => {
    dispatch({ type: 'DELETE_CHAT', payload: chatId });
  };

  const selectChat = (chatId: string): void => {
    dispatch({ type: 'SET_CURRENT_CHAT', payload: chatId });
  };

  const getCurrentChat = (): Chat | null => {
    if (!state.currentChatId) return null;
    return state.chats.find(chat => chat.id === state.currentChatId) || null;
  };

  const sendMessage = async (content: string): Promise<void> => {
    if (!content.trim()) return;
    
    let currentChatId = state.currentChatId;
    
    // Create a new chat if none exists
    if (!currentChatId) {
      const newChat = createChat(generateChatTitle(content));
      dispatch({ type: 'ADD_CHAT', payload: newChat });
      currentChatId = newChat.id;
    }

    const userMessage = createMessage(content, 'user');
    dispatch({ type: 'ADD_MESSAGE', payload: { chatId: currentChatId, message: userMessage } });
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    // Update chat title if it's the first message and title is "New Chat"
    const currentChat = state.chats.find(chat => chat.id === currentChatId);
    if (currentChat && currentChat.messages.length === 0 && currentChat.title === 'New Chat') {
      dispatch({ 
        type: 'UPDATE_CHAT', 
        payload: { 
          chatId: currentChatId, 
          updates: { title: generateChatTitle(content) } 
        } 
      });
    }

    try {
      const chat = state.chats.find(c => c.id === currentChatId);
      const messagesForAPI = chat ? [...chat.messages, userMessage] : [userMessage];
      
      const response = await chatAPI.sendMessage(messagesForAPI, state.settings);

      const assistantMessage = createMessage(response, 'assistant');
      dispatch({ type: 'ADD_MESSAGE', payload: { chatId: currentChatId, message: assistantMessage } });
    } catch (error: any) {
      console.error('Failed to send message:', error);
      dispatch({ type: 'SET_ERROR', payload: error.message });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const clearAllChats = (): void => {
    dispatch({ type: 'CLEAR_ALL_CHATS' });
    storage.clearAllChats();
  };

  const setApiKey = (key: string): void => {
    dispatch({ type: 'SET_API_KEY', payload: key });
    storage.setApiKey(key);
    // chatAPI.setApiKey is handled by the useEffect for dynamic updates
  };

  const isApiKeySet = (): boolean => {
    return Boolean(state.settings.apiKey && state.settings.apiKey.trim());
  };

  const contextValue: ChatContextType = {
    state,
    dispatch,
    // Chat management
    createNewChat,
    deleteChat,
    selectChat,
    getCurrentChat,
    // Messaging
    sendMessage,
    // Settings
    setApiKey,
    isApiKeySet,
    // Utilities
    clearAllChats,
  };

  return (
    <ChatContext.Provider value={contextValue}>
      {children}
    </ChatContext.Provider>
  );
};

// Hook to use the chat context
export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};