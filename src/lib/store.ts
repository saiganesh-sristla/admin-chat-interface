import { create } from 'zustand';

export type User = {
  id: string;
  name: string;
  avatar: string;
  company?: string;
};

export type Message = {
  id: string;
  text: string;
  sender: 'user' | 'agent' | 'ai';
  timestamp: Date;
  seen?: boolean;
  user?: User;
};

export type Conversation = {
  id: string;
  user: User;
  messages: Message[];
  lastMessage: string;
  unread: boolean;
  timestamp: Date;
};

export type AIAssistantState = {
  visible: boolean;
  tab: 'aiCopilot' | 'details';
};

export type ComposeMessage = {
  text: string;
  inProgress: boolean;
};

interface ChatStore {
  conversations: Conversation[];
  activeConversation: string | null;
  aiAssistant: AIAssistantState;
  composeMessage: ComposeMessage;
  setActiveConversation: (id: string | null) => void;
  sendMessage: (text: string) => void;
  toggleAIAssistant: () => void;
  setAIAssistantTab: (tab: 'aiCopilot' | 'details') => void;
  setComposeMessage: (text: string) => void;
  addAIResponseToComposer: (text: string) => void;
}

const initialConversations: Conversation[] = [
  {
    id: '1',
    user: {
      id: 'u1',
      name: 'Luis',
      avatar: 'https://i.pravatar.cc/150?img=1',
      company: 'Github'
    },
    messages: [
      {
        id: 'm1',
        text: "I bought a product from your store in November as a Christmas gift for a member of my family. However, it turns out they have something very similar already. I was hoping you'd be able to refund me, as it is un-opened.",
        sender: 'user',
        timestamp: new Date(Date.now() - 45 * 60000),
        user: {
          id: 'u1',
          name: 'Luis',
          avatar: 'https://i.pravatar.cc/150?img=1',
          company: 'Github'
        }
      }
    ],
    lastMessage: "I bought a product from your store in November as a Christmas gift...",
    unread: false,
    timestamp: new Date(Date.now() - 45 * 60000)
  },
  {
    id: '2',
    user: {
      id: 'u2',
      name: 'Ivan',
      avatar: 'https://i.pravatar.cc/150?img=2',
      company: 'Nike'
    },
    messages: [
      {
        id: 'm2',
        text: "Hi there, I have a question about my recent order.",
        sender: 'user',
        timestamp: new Date(Date.now() - 30 * 60000),
        user: {
          id: 'u2',
          name: 'Ivan',
          avatar: 'https://i.pravatar.cc/150?img=2',
          company: 'Nike'
        }
      }
    ],
    lastMessage: "Hi there, I have a question about my recent order.",
    unread: true,
    timestamp: new Date(Date.now() - 30 * 60000)
  }
];

const useStore = create<ChatStore>((set) => ({
  conversations: initialConversations,
  activeConversation: null,
  aiAssistant: {
    visible: true,
    tab: 'aiCopilot'
  },
  composeMessage: {
    text: '',
    inProgress: false
  },
  setActiveConversation: (id) => set({ activeConversation: id }),
  sendMessage: (text) => set((state) => {
    if (!state.activeConversation) return state;

    const updatedConversations = state.conversations.map(convo => {
      if (convo.id === state.activeConversation) {
        const newMessage: Message = {
          id: `m${Date.now()}`,
          text,
          sender: 'agent',
          timestamp: new Date()
        };
        return {
          ...convo,
          messages: [...convo.messages, newMessage],
          lastMessage: text,
          timestamp: new Date()
        };
      }
      return convo;
    });

    return { 
      conversations: updatedConversations,
      composeMessage: { text: '', inProgress: false }
    };
  }),
  toggleAIAssistant: () => set((state) => ({
    aiAssistant: {
      ...state.aiAssistant,
      visible: !state.aiAssistant.visible
    }
  })),
  setAIAssistantTab: (tab) => set((state) => ({
    aiAssistant: {
      ...state.aiAssistant,
      tab
    }
  })),
  setComposeMessage: (text) => set((state) => ({
    composeMessage: {
      ...state.composeMessage,
      text
    }
  })),
  addAIResponseToComposer: (text) => set((state) => ({
    composeMessage: {
      ...state.composeMessage,
      text
    }
  }))
}));

export default useStore;