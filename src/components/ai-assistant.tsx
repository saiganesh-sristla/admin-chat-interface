import { useState } from 'react';
import useStore from '@/lib/store';
import { Bot, X, ChevronDown, Check, EditPencil, Settings2 } from 'lucide-react';

const aiSuggestions = [
  {
    id: '1',
    title: 'Refund Policy Template',
    content: `We understand that sometimes a purchase may not meet your expectations, and you may need to request a refund.

To assist you with your refund request, could you please provide your order ID and proof of purchase.

Please note:
We can only refund orders placed within the last 60 days, and your item must meet our requirements for condition to be returned. Please check when you placed your order before proceeding.

Once I've checked these details, if everything looks OK, I will send a returns QR code which you can use to post the item back to us. Your refund will be automatically issued once you put it in the post.`
  },
  {
    id: '2',
    title: 'Ask for order details',
    content: 'To help you with your refund request, could you please provide your order number and the email address associated with your purchase? This will help me locate your order in our system.'
  },
  {
    id: '3',
    title: 'Explain return process',
    content: 'After I verify your order details, I\'ll generate a return shipping label that you can use to send the item back. Once we receive the returned item, we\'ll process your refund, which typically takes 3-5 business days to appear on your original payment method.'
  }
];

const relevantSources = [
  { id: '1', title: 'Getting a refund', icon: 'document' },
  { id: '2', title: 'Refund for an order placed by mistake', icon: 'document' },
  { id: '3', title: 'Refund for an unwanted gift', icon: 'document' }
];

const AiAssistant = () => {
  const { aiAssistant, toggleAIAssistant, setAIAssistantTab, addAIResponseToComposer } = useStore();
  const [selectedSuggestion, setSelectedSuggestion] = useState<string | null>(null);

  const handleUseSuggestion = (content: string) => {
    addAIResponseToComposer(content);
  };

  return (
    <div className="border-l w-96 flex flex-col h-full">
      <div className="border-b p-4 flex items-center">
        <div className="flex-1 flex items-center">
          <button
            className={`flex items-center px-3 py-1 text-sm font-medium ${
              aiAssistant.tab === 'aiCopilot'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500'
            }`}
            onClick={() => setAIAssistantTab('aiCopilot')}
          >
            <Bot className="h-4 w-4 mr-2" />
            AI Copilot
          </button>
          <button
            className={`flex items-center px-3 py-1 text-sm font-medium ${
              aiAssistant.tab === 'details'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500'
            }`}
            onClick={() => setAIAssistantTab('details')}
          >
            Details
          </button>
        </div>
        <button
          className="p-1 rounded-full hover:bg-gray-100"
          onClick={toggleAIAssistant}
        >
          <X className="h-5 w-5 text-gray-500" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {aiAssistant.tab === 'aiCopilot' ? (
          <div className="p-4">
            <div className="flex justify-center mt-10 mb-6">
              <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">
                <Bot className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold">Hi, I'm Fin AI Copilot</h2>
              <p className="text-gray-500 text-sm mt-1">
                Ask me anything about this conversation.
              </p>
            </div>

            <div className="space-y-4 mt-8">
              <div className="text-sm font-medium text-gray-700">Suggested responses</div>
              {aiSuggestions.map((suggestion) => (
                <div 
                  key={suggestion.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedSuggestion === suggestion.id 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedSuggestion(suggestion.id)}
                >
                  <div className="font-medium text-sm">{suggestion.title}</div>
                  <div className="text-xs text-gray-500 mt-1 line-clamp-2">
                    {suggestion.content}
                  </div>
                  {selectedSuggestion === suggestion.id && (
                    <div className="mt-2 flex justify-end">
                      <button
                        className="bg-blue-500 text-white text-xs py-1 px-3 rounded-md flex items-center"
                        onClick={() => handleUseSuggestion(suggestion.content)}
                      >
                        <Check className="h-3 w-3 mr-1" /> Use
                      </button>
                    </div>
                  )}
                </div>
              ))}

              <div className="mt-8">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-medium text-gray-700">
                    15 relevant sources found
                  </div>
                  <button className="text-xs text-blue-500 hover:underline">
                    See all →
                  </button>
                </div>
                <div className="space-y-2">
                  {relevantSources.map((source) => (
                    <div key={source.id} className="p-2 hover:bg-gray-50 rounded flex items-center">
                      <div className="w-5 h-5 bg-blue-100 text-blue-700 rounded flex items-center justify-center mr-2">
                        <Bot className="h-3 w-3" />
                      </div>
                      <div className="text-sm">{source.title}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4">
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-medium text-sm">Customer Details</h3>
                <div className="mt-2 space-y-2">
                  <div className="text-sm">
                    <span className="text-gray-500">Name:</span> Luis Easton
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-500">Email:</span> luis.easton@example.com
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-500">First seen:</span> 7 days ago
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-medium text-sm">Previous Conversations</h3>
                <div className="mt-2 text-sm text-gray-500">
                  No previous conversations
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-medium text-sm">Orders</h3>
                <div className="mt-2">
                  <div className="text-sm border p-2 rounded">
                    <div className="font-medium">Order #12345</div>
                    <div className="text-gray-500 text-xs mt-1">
                      Placed on Nov 15, 2023 • $79.99
                    </div>
                    <div className="text-xs mt-1">
                      Status: <span className="text-green-600">Delivered</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="border-t p-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Ask a follow up question..."
            className="w-full p-2 pl-4 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
            <ChevronDown className="h-5 w-5 rotate-180" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AiAssistant;