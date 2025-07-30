import { ChatProvider } from './context/ChatContext';
import Sidebar from './components/Sidebar';
import ChatContainer from './components/ChatContainer';
import MessageInput from './components/MessageInput';

function App() {
  return (
    <ChatProvider>
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
    </ChatProvider>
  );
}

export default App;