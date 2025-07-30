# Olivia Chatbot

An AI-powered chatbot built with React and TypeScript, using OpenRouter's DeepSeek V3 API for intelligent conversations.

## 🚀 Features

- **Real-time AI Conversations**: Powered by DeepSeek V3 model via OpenRouter
- **Secure API Key Storage**: Keys stored locally in browser, never sent to our servers
- **Modern UI/UX**: Clean, minimalist design inspired by modern chat interfaces
- **Persistent Chat History**: Messages saved locally for continuity
- **TypeScript**: Full type safety throughout the application
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠️ Tech Stack

- **React 19** - Modern React with hooks
- **TypeScript** - Type safety and better development experience
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **OpenAI SDK** - For API integration with OpenRouter
- **React Icons** - Beautiful, customizable icons

## 🔧 Development

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open http://localhost:5173 in your browser

### Building for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 🔐 API Key Setup

The application uses OpenRouter's API to access the DeepSeek V3 model. You'll need to:

1. Get an API key from [OpenRouter](https://openrouter.ai/)
2. Enter your API key in the application's settings panel
3. Your key is stored locally and never transmitted to external servers

## 🏗️ Architecture

### Project Structure

```
src/
├── components/          # React components
│   ├── ApiKeyInput.tsx     # API key management
│   ├── ChatContainer.tsx   # Main chat interface
│   ├── Message.tsx         # Individual message display
│   ├── MessageInput.tsx    # Message input form
│   ├── Sidebar.tsx         # Settings sidebar
│   └── TypingIndicator.tsx # Loading animation
├── context/             # React context providers
│   └── ChatContext.tsx     # Global chat state management
├── types/               # TypeScript type definitions
│   └── index.ts            # Shared types
├── utils/               # Utility functions
│   ├── api.ts              # OpenRouter API client
│   ├── helpers.ts          # General helper functions
│   └── storage.ts          # Local storage management
├── App.tsx              # Main application component
├── main.tsx             # Application entry point
└── index.css            # Global styles and Tailwind imports
```

### Key Components

- **ChatContext**: Manages global application state using React Context and useReducer
- **ChatAPI**: Handles communication with OpenRouter's DeepSeek V3 API
- **Storage utilities**: Manage secure local storage of settings and messages
- **Type-safe components**: All components fully typed with TypeScript

## 🎨 Design Philosophy

The interface follows modern design principles:

- **Minimalist**: Clean, distraction-free interface focusing on conversation
- **Accessible**: Proper contrast ratios, keyboard navigation, and screen reader support  
- **Responsive**: Mobile-first design that works on all screen sizes
- **Performance**: Optimized rendering and efficient state management

## 🔒 Security & Privacy

- API keys stored locally using browser's localStorage
- No server-side storage of conversations or keys
- Direct client-to-OpenRouter communication
- No third-party tracking or analytics

## 📝 License

MIT License - see LICENSE file for details

## 🤝 Contributing

This project was built as part of the Olivia Vibe Coder Challenge. Contributions and feedback are welcome!