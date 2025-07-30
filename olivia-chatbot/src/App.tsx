import { ChatProvider, useChat } from './context/ChatContext';
import Sidebar from './components/Sidebar';
import ChatContainer from './components/ChatContainer';
import MessageInput from './components/MessageInput';
import SetupScreen from './components/SetupScreen';

const AppContent = () => {
  const { isApiKeySet } = useChat();

  if (!isApiKeySet()) {
    return <SetupScreen />;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Messages */}
        <ChatContainer />
        
        {/* Message Input */}
        <MessageInput />
      </div>
    </div>
  );
};

function App() {
  return (
    <ChatProvider>
      <AppContent />
    </ChatProvider>
  );
}

export default App;