import { useState } from 'react';
import useStore, { Conversation } from '@/lib/store';
import Avatar from './avatar';
import { formatTimeAgo } from '@/lib/utils';
import { Search, Inbox, Clock } from 'lucide-react';

const ConversationList = () => {
  const { conversations, activeConversation, setActiveConversation } = useStore();
  const [filter, setFilter] = useState('open');
  const [sortBy, setSortBy] = useState('waiting');

  return (
    <div className="h-full flex flex-col border-r">
      <div className="p-4 border-b">
        <div className="flex items-center">
          <h2 className="text-lg font-semibold">Your inbox</h2>
          <div className="ml-auto">
            <div className="relative">
              <button className="flex items-center text-sm text-gray-500 gap-1">
                {filter === 'open' ? <span>5 Open</span> : 'All'}
                <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="mt-2 relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 border rounded-md text-sm"
          />
        </div>
        <div className="mt-2 flex items-center gap-2">
          <button 
            className={`flex items-center gap-1 text-xs px-2 py-1 rounded ${sortBy === 'waiting' ? 'bg-gray-200' : 'bg-transparent'}`}
            onClick={() => setSortBy('waiting')}
          >
            <Clock className="h-3 w-3" />
            Waiting longest
          </button>
        </div>
      </div>

      <div className="overflow-y-auto flex-1">
        {conversations.map((conversation) => (
          <ConversationItem
            key={conversation.id}
            conversation={conversation}
            isActive={conversation.id === activeConversation}
            onClick={() => setActiveConversation(conversation.id)}
          />
        ))}
      </div>
    </div>
  );
};

type ConversationItemProps = {
  conversation: Conversation;
  isActive: boolean;
  onClick: () => void;
};

const ConversationItem = ({ conversation, isActive, onClick }: ConversationItemProps) => {
  return (
    <div
      className={`p-4 cursor-pointer border-b transition-colors ${
        isActive ? 'bg-blue-50' : 'hover:bg-gray-50'
      }`}
      onClick={onClick}
    >
      <div className="flex">
        <Avatar 
          name={conversation.user.name} 
          src={conversation.user.avatar} 
          size="md" 
        />
        <div className="ml-3 flex-1 overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <h3 className="text-sm font-medium truncate">
                {conversation.user.name}
                {conversation.user.company && (
                  <span className="ml-1 text-gray-500">- {conversation.user.company}</span>
                )}
              </h3>
              {conversation.unread && (
                <span className="ml-2 inline-block w-2 h-2 bg-blue-500 rounded-full"></span>
              )}
            </div>
            <span className="text-xs text-gray-500">
              {formatTimeAgo(conversation.timestamp)}
            </span>
          </div>
          <p className="text-sm text-gray-500 truncate mt-1">{conversation.lastMessage}</p>
        </div>
      </div>
    </div>
  );
};

export default ConversationList;