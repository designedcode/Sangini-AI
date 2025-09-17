export interface Language {
  code: string
  name: string
  nativeName: string
}

export interface StateLangMap {
  [state: string]: string[]
}

export interface Category {
  id: string
  name: string
  description: string
  icon: string
  sfw: boolean
}

export interface Model {
  id: string
  name: string
  tagline: string
  description: string
  category: string
  language: string[]
  opener: string
  avatar?: string
  popular?: boolean
}

export interface Scene {
  id: string
  title: string
  description: string
  opener: string
  category: string
  sfw: boolean
}

export interface SKU {
  id: string
  name: string
  price: number
  type: 'quick' | 'tonight' | 'day' | 'week' | 'month' | 'topup'
  description: string
  features: string[]
  minutes?: number
  messages?: number
  images?: number
}

export interface Chat {
  id: string
  modelId: string
  userId: string
  lastMessage: string
  lastMessageAt: Date
  unreadCount: number
  isActive: boolean
}

export interface Message {
  id: string
  chatId: string
  sender: 'user' | 'model'
  type: 'text' | 'image' | 'video' | 'voice' | 'system'
  content: string
  timestamp: Date
  status?: 'sent' | 'delivered' | 'read'
  locked?: boolean
  mediaUrl?: string
}

export interface User {
  id: string
  phone: string
  name?: string
  language: string
  state?: string
  wallet: number
  isAuthenticated: boolean
  welcomeWeekUsed: boolean
  referralCode: string
  communityPublishing: boolean
  readReceipts: boolean
}

export interface Referral {
  id: string
  inviterId: string
  inviteeId: string
  stage: 'otp' | 'opened' | 'quality' | 'paid'
  rewardType: 'minutes' | 'pics'
  createdAt: Date
}
