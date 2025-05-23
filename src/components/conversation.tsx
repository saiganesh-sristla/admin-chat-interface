import { useEffect, useRef } from 'react';
import useStore from '@/lib/store';
import Avatar from './avatar';
import { formatTimeAgo } from '@/lib/utils';
import { X } from 'lucide-react';

const Conversation = () => {
  const { conversations, activeConversation, setActiveConversation } = useStore();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeConvo = conversations.find(c => c.id === activeConversation);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeConvo?.messages]);

  if (!activeConvo) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900">No conversation selected</h3>
          <p className="mt-1 text-sm text-gray-500">Choose a conversation from the sidebar</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="border-b p-4 flex items-center">
        <Avatar 
          name={activeConvo.user.name} 
          src={activeConvo.user.avatar} 
          size="md" 
        />
        <div className="ml-3">
          <h2 className="text-lg font-semibold">{activeConvo.user.name}</h2>
          {activeConvo.user.company && <p className="text-sm text-gray-500">{activeConvo.user.company}</p>}
        </div>
        <div className="ml-auto">
          <button 
            className="p-1 rounded-full hover:bg-gray-100"
            onClick={() => setActiveConversation(null)}
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {activeConvo.messages.map((message) => (
          <div
            key={message.id}
            className={`mb-4 flex ${
              message.sender === 'user' ? 'justify-start' : 'justify-end'
            }`}
          >
            {message.sender === 'user' && (
              <div className="mr-2 flex-shrink-0">
                <Avatar 
                  name={message.user?.name || activeConvo.user.name} 
                  src={message.user?.avatar || activeConvo.user.avatar} 
                  size="sm" 
                />
              </div>
            )}
            <div
              className={`max-w-3/4 p-3 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-white border'
                  : 'bg-blue-100'
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <div className="mt-1 text-xs text-gray-500 flex items-center">
                <span>{formatTimeAgo(message.timestamp)}</span>
                {message.sender === 'agent' && message.seen && (
                  <span className="ml-1">· Seen</span>
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default Conversation;