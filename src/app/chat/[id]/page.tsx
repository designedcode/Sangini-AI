'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useAppStore } from '@/demo/store'
import { demoAPI } from '@/demo/api'
import { models } from '@/demo/seeds/models'
import { t } from '@/demo/i18n'
import { 
  ArrowLeft, 
  Phone, 
  Mic, 
  Send, 
  Camera, 
  Video, 
  Settings,
  MoreVertical,
  Lock,
  Users
} from 'lucide-react'
import MediaTile from '@/components/MediaTile'

export default function ChatPage() {
  const params = useParams()
  const router = useRouter()
  const chatId = params.id as string
  
  const [message, setMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  
  const { 
    user, 
    chats, 
    messages, 
    addMessage, 
    setShowCallOverlay,
    setShowUpsellModal,
    isAuthenticated 
  } = useAppStore()

  const chat = chats.find(c => c.id === chatId)
  const chatMessages = messages[chatId] || []
  const model = chat ? models.find(m => m.id === chat.modelId) : null

  const messagesLeftToday = user ? Math.max(0, 10 - chatMessages.length) : 0
  const callMinutesLeft = user ? 5 : 0 // Demo: 5 minutes

  useEffect(() => {
    if (!chat) {
      router.push('/discover')
      return
    }

    // Add welcome message if no messages
    if (chatMessages.length === 0 && model) {
      const welcomeMessage = {
        id: `welcome-${chatId}`,
        chatId,
        sender: 'model' as const,
        type: 'text' as const,
        content: model.opener,
        timestamp: new Date(),
        status: 'delivered' as const
      }
      addMessage(chatId, welcomeMessage)
    }
  }, [chat, chatMessages.length, model, chatId, addMessage, router])

  const handleSendMessage = async () => {
    if (!message.trim() || !isAuthenticated || !user) return

    if (messagesLeftToday === 0) {
      setShowUpsellModal(true)
      return
    }

    setIsTyping(true)
    try {
      await demoAPI.sendMessage(chatId, message)
      setMessage('')
    } catch (error) {
      console.error('Failed to send message:', error)
    } finally {
      setIsTyping(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleRequestPhoto = () => {
    if (!isAuthenticated || !user) {
      setShowUpsellModal(true)
      return
    }
    // Show photo request sheet
  }

  const handleRequestVideo = () => {
    if (!isAuthenticated || !user) {
      setShowUpsellModal(true)
      return
    }
    // Show video request sheet
  }

  const handleChooseScene = () => {
    if (!isAuthenticated || !user) {
      setShowUpsellModal(true)
      return
    }
    // Show scene picker
  }

  const handleCall = () => {
    if (!isAuthenticated || !user) {
      setShowUpsellModal(true)
      return
    }
    setShowCallOverlay(true)
  }

  if (!chat || !model) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Chat not found</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          
          <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold">
              {model.name.charAt(0)}
            </span>
          </div>
          
          <div>
            <h2 className="font-semibold text-gray-900">{model.name}</h2>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs text-gray-500">Online</span>
            </div>
          </div>
        </div>

        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <MoreVertical className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      {/* Action Pills */}
      <div className="p-4 bg-gray-50 border-b border-gray-200">
        <div className="flex space-x-2 overflow-x-auto">
          <button
            onClick={handleRequestPhoto}
            className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full text-sm font-medium text-gray-700 border border-gray-200 whitespace-nowrap"
          >
            <Camera className="w-4 h-4" />
            <span>{t('request_photo', user?.language || 'en')}</span>
          </button>
          <button
            onClick={handleRequestVideo}
            className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full text-sm font-medium text-gray-700 border border-gray-200 whitespace-nowrap"
          >
            <Video className="w-4 h-4" />
            <span>{t('request_video', user?.language || 'en')}</span>
          </button>
          <button
            onClick={handleChooseScene}
            className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full text-sm font-medium text-gray-700 border border-gray-200 whitespace-nowrap"
          >
            <Settings className="w-4 h-4" />
            <span>{t('choose_scene', user?.language || 'en')}</span>
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chatMessages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                msg.sender === 'user'
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <p className="text-sm">{msg.content}</p>
              <div className="flex items-center justify-end mt-1 space-x-1">
                <span className="text-xs opacity-70">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
                {msg.sender === 'user' && msg.status && (
                  <span className="text-xs opacity-70">
                    {msg.status === 'sent' && '✓'}
                    {msg.status === 'delivered' && '✓✓'}
                    {msg.status === 'read' && '✓✓'}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Sample locked media */}
        <div className="flex justify-start">
          <div className="max-w-xs">
            <MediaTile type="image" isLocked={true} />
            <p className="text-xs text-gray-500 mt-1">
              {model.name} sent a photo
            </p>
          </div>
        </div>

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 px-4 py-2 rounded-2xl">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* NSFW Warning */}
      <div className="px-4 py-2 bg-yellow-50 border-t border-yellow-200">
        <p className="text-xs text-yellow-800 text-center">
          {t('adults_only', user?.language || 'en')}
        </p>
      </div>

      {/* Message Input */}
      <div className="p-4 bg-white border-t border-gray-200">
        {/* Meters */}
        <div className="flex justify-between text-xs text-gray-600 mb-2">
          <span>{messagesLeftToday} {t('messages_left', user?.language || 'en')}</span>
          <span>{callMinutesLeft} {t('call_minutes_left', user?.language || 'en')}</span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleCall}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Phone className="w-5 h-5 text-gray-700" />
          </button>
          
          <div className="flex-1 relative">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-full focus:ring-2 focus:ring-black focus:border-transparent"
              disabled={messagesLeftToday === 0}
            />
            <button
              onClick={handleSendMessage}
              disabled={!message.trim() || messagesLeftToday === 0}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-50"
            >
              <Send className="w-5 h-5 text-gray-700" />
            </button>
          </div>

          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Mic className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        {/* Quick Actions */}
        {messagesLeftToday === 0 && (
          <div className="mt-3 flex space-x-2">
            <button
              onClick={() => setShowUpsellModal(true)}
              className="flex-1 bg-black text-white py-2 rounded-lg text-sm font-medium"
            >
              {t('continue_tonight', user?.language || 'en')}
            </button>
            <button
              onClick={() => setShowUpsellModal(true)}
              className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg text-sm font-medium"
            >
              {t('add_3min_call', user?.language || 'en')}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
