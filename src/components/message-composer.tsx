import { useState, useRef } from 'react';
import useStore from '@/lib/store';
import { Send, Paperclip, SmilePlus, ChevronDown } from 'lucide-react';

const MessageComposer = () => {
  const { composeMessage, setComposeMessage, sendMessage } = useStore();
  const [showFormatting, setShowFormatting] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (composeMessage.text.trim()) {
      sendMessage(composeMessage.text);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 150)}px`;
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComposeMessage(e.target.value);
    adjustTextareaHeight();
  };

  return (
    <div className="p-4 border-t">
      <div className="flex items-center mb-2">
        <div className="flex items-center space-x-2">
          <button
            className="p-1 rounded hover:bg-gray-100"
            onClick={() => setShowFormatting(!showFormatting)}
          >
            <span className="flex items-center text-gray-500 text-sm">
              Chat <ChevronDown className="h-4 w-4 ml-1" />
            </span>
          </button>
        </div>
        <div className="text-xs text-gray-400 ml-auto">
          Use ⌘K for shortcuts
        </div>
      </div>

      <form onSubmit={handleSubmit} className="relative">
        <textarea
          ref={textareaRef}
          value={composeMessage.text}
          onChange={handleTextChange}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className="w-full p-3 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none min-h-[42px]"
          rows={1}
        />
        <div className="absolute right-3 bottom-3 flex items-center space-x-2">
          <button type="button" className="text-gray-400 hover:text-gray-600">
            <Paperclip className="h-5 w-5" />
          </button>
          <button type="button" className="text-gray-400 hover:text-gray-600">
            <SmilePlus className="h-5 w-5" />
          </button>
          <button
            type="submit"
            disabled={!composeMessage.text.trim()}
            className={`p-1 rounded-full ${
              composeMessage.text.trim()
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageComposer;