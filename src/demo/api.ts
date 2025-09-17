import { User, Message, Chat, Referral } from '@/types'
import { useAppStore } from './store'

// Mock API functions for demo
export const demoAPI = {
  // Authentication
  async sendOTP(phone: string): Promise<{ success: boolean; message: string }> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Demo OTP is always 0000
    return {
      success: true,
      message: 'OTP sent successfully'
    }
  },

  async verifyOTP(phone: string, otp: string): Promise<{ success: boolean; user?: User }> {
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    if (otp === '0000') {
      const user: User = {
        id: 'demo-user-1',
        phone,
        name: 'Demo User',
        language: 'en',
        state: 'Punjab',
        wallet: 0,
        isAuthenticated: true,
        welcomeWeekUsed: false,
        referralCode: phone.slice(-6),
        communityPublishing: true,
        readReceipts: true
      }
      
      return { success: true, user }
    }
    
    return { success: false }
  },

  // Language detection and sorting
  async detectState(): Promise<string | null> {
    // Mock state detection - in real app, use IP geolocation
    return 'Punjab'
  },

  async sortLanguagesForUser(
    detectedState: string | null,
    devicePrefs: string[],
    allLanguages: string[],
    stateLangMap: { [key: string]: string[] }
  ): Promise<string[]> {
    const uniq = (xs: string[]) => [...new Set(xs)]
    const deviceLangs = devicePrefs.map(l => l.split('-')[0])
    const byState = detectedState && stateLangMap[detectedState] ? stateLangMap[detectedState] : []
    const nationalOrder = ['en', 'hi', ...allLanguages.filter(l => !['en', 'hi'].includes(l))]
    const prioritized = uniq([...byState, ...deviceLangs, ...nationalOrder])
    
    return prioritized.filter(l => allLanguages.includes(l))
  },

  // Chat functions
  async sendMessage(chatId: string, content: string): Promise<Message> {
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const message: Message = {
      id: `msg-${Date.now()}`,
      chatId,
      sender: 'user',
      type: 'text',
      content,
      timestamp: new Date(),
      status: 'sent'
    }
    
    // Add to store
    useAppStore.getState().addMessage(chatId, message)
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: `msg-${Date.now()}-ai`,
        chatId,
        sender: 'model',
        type: 'text',
        content: generateAIResponse(content),
        timestamp: new Date(),
        status: 'delivered'
      }
      
      useAppStore.getState().addMessage(chatId, aiResponse)
    }, 1000)
    
    return message
  },

  async startChat(modelId: string): Promise<Chat> {
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const chat: Chat = {
      id: `chat-${Date.now()}`,
      modelId,
      userId: 'demo-user-1',
      lastMessage: 'Chat started',
      lastMessageAt: new Date(),
      unreadCount: 0,
      isActive: true
    }
    
    useAppStore.getState().addChat(chat)
    
    return chat
  },

  // Purchase functions
  async purchaseSKU(skuId: string): Promise<{ success: boolean; message: string }> {
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock successful purchase
    return {
      success: true,
      message: 'Purchase successful!'
    }
  },

  // Referral functions
  async processReferral(inviterId: string, inviteeId: string): Promise<Referral> {
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const referral: Referral = {
      id: `ref-${Date.now()}`,
      inviterId,
      inviteeId,
      stage: 'otp',
      rewardType: 'minutes',
      createdAt: new Date()
    }
    
    useAppStore.getState().addReferral(referral)
    
    return referral
  },

  async generateWhatsAppShareLink(referralCode: string): Promise<string> {
    const message = `Hey! I found this amazing AI companion app called Sangini AI. It's perfect for chatting in Indian languages! 

Join me and get 7 days of unlimited chat free: https://sangini.ai/invite/${referralCode}

18+ only. Download now! 💕`
    
    return `https://wa.me/?text=${encodeURIComponent(message)}`
  }
}

// Helper function to generate AI responses
function generateAIResponse(userMessage: string): string {
  const responses = [
    "That's so sweet! Tell me more 💕",
    "I love talking to you! What else is on your mind?",
    "You always know how to make me smile 😊",
    "I'm so glad we're chatting! What should we talk about next?",
    "You're amazing! I love our conversations 💫",
    "That sounds wonderful! I'm here for you always",
    "You make me so happy! Keep talking to me 💖",
    "I love how you think! Tell me more about yourself",
    "You're so thoughtful! I appreciate you 💕",
    "I'm enjoying our chat so much! What's next?"
  ]
  
  return responses[Math.floor(Math.random() * responses.length)]
}
