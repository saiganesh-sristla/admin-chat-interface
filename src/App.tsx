import { useEffect } from 'react';
import ConversationList from './components/conversation-list';
import Conversation from './components/conversation';
import MessageComposer from './components/message-composer';
import AiAssistant from './components/ai-assistant';
import useStore from './lib/store';

function App() {
  const { aiAssistant } = useStore();

  // Load demo data on initial render
  useEffect(() => {
    // Initial state is loaded from store
  }, []);

  return (
    <div className="h-screen flex overflow-hidden bg-white">
      <div className="w-80 flex-shrink-0">
        <ConversationList />
      </div>
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex flex-1 overflow-hidden">
          <div className="flex-1 flex flex-col">
            <Conversation />
            <MessageComposer />
          </div>
          
          {aiAssistant.visible && <AiAssistant />}
        </div>
      </div>
    </div>
  );
}

export default App;