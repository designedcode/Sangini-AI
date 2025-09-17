import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User, Chat, Message, Referral } from '@/types'

interface AppState {
  // User state
  user: User | null
  isAuthenticated: boolean
  
  // Chat state
  chats: Chat[]
  activeChat: string | null
  messages: { [chatId: string]: Message[] }
  
  // Wallet and referrals
  wallet: number
  referrals: Referral[]
  
  // Settings
  communityPublishing: boolean
  readReceipts: boolean
  
  // UI state
  showLanguageModal: boolean
  showAuthModal: boolean
  showUpsellModal: boolean
  showCallOverlay: boolean
  
  // Actions
  setUser: (user: User | null) => void
  setAuthenticated: (authenticated: boolean) => void
  addChat: (chat: Chat) => void
  updateChat: (chatId: string, updates: Partial<Chat>) => void
  addMessage: (chatId: string, message: Message) => void
  setActiveChat: (chatId: string | null) => void
  updateWallet: (amount: number) => void
  addReferral: (referral: Referral) => void
  toggleCommunityPublishing: () => void
  toggleReadReceipts: () => void
  setShowLanguageModal: (show: boolean) => void
  setShowAuthModal: (show: boolean) => void
  setShowUpsellModal: (show: boolean) => void
  setShowCallOverlay: (show: boolean) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      chats: [
        {
          id: 'demo-chat-1',
          modelId: 'priya',
          userId: 'demo-user-1',
          lastMessage: 'Hey! How are you doing today?',
          lastMessageAt: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
          unreadCount: 0,
          isActive: true
        },
        {
          id: 'demo-chat-2',
          modelId: 'kavya',
          userId: 'demo-user-1',
          lastMessage: 'Ready for some fun? 😉',
          lastMessageAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
          unreadCount: 1,
          isActive: true
        }
      ],
      activeChat: null,
      messages: {},
      wallet: 0,
      referrals: [],
      communityPublishing: true, // Default ON
      readReceipts: true,
      showLanguageModal: false,
      showAuthModal: false,
      showUpsellModal: false,
      showCallOverlay: false,
      
      // Actions
      setUser: (user) => set({ user }),
      setAuthenticated: (authenticated) => set({ isAuthenticated: authenticated }),
      
      addChat: (chat) => set((state) => ({
        chats: [chat, ...state.chats.filter(c => c.id !== chat.id)]
      })),
      
      updateChat: (chatId, updates) => set((state) => ({
        chats: state.chats.map(chat => 
          chat.id === chatId ? { ...chat, ...updates } : chat
        )
      })),
      
      addMessage: (chatId, message) => set((state) => ({
        messages: {
          ...state.messages,
          [chatId]: [...(state.messages[chatId] || []), message]
        }
      })),
      
      setActiveChat: (chatId) => set({ activeChat: chatId }),
      
      updateWallet: (amount) => set((state) => ({
        wallet: state.wallet + amount
      })),
      
      addReferral: (referral) => set((state) => ({
        referrals: [...state.referrals, referral]
      })),
      
      toggleCommunityPublishing: () => set((state) => ({
        communityPublishing: !state.communityPublishing
      })),
      
      toggleReadReceipts: () => set((state) => ({
        readReceipts: !state.readReceipts
      })),
      
      setShowLanguageModal: (show) => set({ showLanguageModal: show }),
      setShowAuthModal: (show) => set({ showAuthModal: show }),
      setShowUpsellModal: (show) => set({ showUpsellModal: show }),
      setShowCallOverlay: (show) => set({ showCallOverlay: show }),
    }),
    {
      name: 'sangini-store',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        chats: state.chats,
        wallet: state.wallet,
        referrals: state.referrals,
        communityPublishing: state.communityPublishing,
        readReceipts: state.readReceipts,
      }),
      onRehydrateStorage: () => (state) => {
        if (state?.chats) {
          // Convert string dates back to Date objects
          state.chats = state.chats.map(chat => ({
            ...chat,
            lastMessageAt: new Date(chat.lastMessageAt)
          }))
        }
        if (state?.referrals) {
          state.referrals = state.referrals.map(ref => ({
            ...ref,
            createdAt: new Date(ref.createdAt)
          }))
        }
      },
    }
  )
)
