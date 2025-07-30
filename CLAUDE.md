# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This repository contains the **Olivia Chatbot** - an AI-powered chatbot built with React and TypeScript for the Olivia Vibe Coder Challenge. The chatbot uses OpenRouter's DeepSeek V3 API for intelligent conversations.

## Development Commands

### Core Commands
- `npm run dev` - Start development server (http://localhost:5173)
- `npm run build` - Build for production 
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Project Structure
- **Frontend**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS v3.4.0
- **AI Integration**: OpenRouter DeepSeek V3 API via OpenAI SDK
- **State Management**: React Context + useReducer

## Architecture Overview

### Key Directories
- `src/components/` - React components (UI elements)
- `src/context/` - Global state management
- `src/utils/` - API client, storage utilities, helpers
- `src/types/` - TypeScript type definitions

### Core Components
1. **ChatContext** - Global state management using React Context
2. **ChatAPI** - OpenRouter API integration with error handling
3. **Storage utilities** - Secure localStorage management for API keys/messages
4. **Message components** - Chat UI with typing indicators and animations

### Configuration Files
- `tailwind.config.cjs` - Tailwind CSS configuration (CommonJS format)
- `postcss.config.cjs` - PostCSS configuration (CommonJS format)
- `tsconfig.json` - TypeScript configuration with strict mode

## API Integration

- **Model**: `deepseek/deepseek-chat-v3-0324:free`
- **Provider**: OpenRouter (https://openrouter.ai/api/v1)
- **Authentication**: API keys stored locally in browser localStorage
- **Security**: Direct client-to-API communication, no server-side storage

## Development Notes

### Styling
- Uses Tailwind CSS v3.4.0 (NOT v4 - config files must be .cjs format)
- Custom animations and components defined in `src/index.css`
- Responsive design with mobile-first approach

### TypeScript
- Strict type checking enabled
- Import types using `import type { ... }` syntax for verbatimModuleSyntax
- All components and utilities fully typed

### State Management
- Chat messages, settings, and loading states managed via ChatContext
- Persistent storage using localStorage with error handling
- Real-time updates and optimistic UI patterns

## Testing the Application

1. Start dev server: `npm run dev`
2. The app pre-configures the provided OpenRouter API key
3. Test chat functionality immediately without manual API key setup
4. Messages persist across browser sessions via localStorage

## Troubleshooting

- **Build issues**: Ensure config files use `.cjs` extension due to `"type": "module"` in package.json
- **Styling issues**: Verify Tailwind v3.4.0 is installed (not v4)
- **API errors**: Check API key format (should start with `sk-or-v1-`)
- **TypeScript errors**: Use `import type` for type-only imports