'use client'

import { useAppStore } from '@/demo/store'
import { models } from '@/demo/seeds/models'
import { Phone, MessageCircle, Clock } from 'lucide-react'
import Link from 'next/link'

export default function ChatsPage() {
  const { chats, user } = useAppStore()

  const getModelName = (modelId: string) => {
    const model = models.find(m => m.id === modelId)
    return model?.name || 'Unknown'
  }

  const formatLastMessageTime = (date: Date | string) => {
    const now = new Date()
    const messageDate = typeof date === 'string' ? new Date(date) : date
    const diff = now.getTime() - messageDate.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return 'Just now'
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    if (days < 7) return `${days}d ago`
    return messageDate.toLocaleDateString()
  }

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Your Chats</h1>
        <p className="text-gray-600">
          Continue your conversations
        </p>
      </div>

      {/* Stats */}
      {user && (
        <div className="bg-gray-50 rounded-xl p-4">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-gray-900">{chats.length}</p>
              <p className="text-sm text-gray-600">Active Chats</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">₹{user.wallet}</p>
              <p className="text-sm text-gray-600">Wallet Balance</p>
            </div>
          </div>
        </div>
      )}

      {/* Chats List */}
      <div className="space-y-3">
        {chats.length === 0 ? (
          <div className="text-center py-8">
            <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No chats yet</h3>
            <p className="text-gray-600 mb-4">
              Start a conversation with an AI companion
            </p>
            <Link
              href="/discover"
              className="inline-block bg-black text-white px-6 py-3 rounded-lg font-medium"
            >
              Discover Models
            </Link>
          </div>
        ) : (
          chats.map((chat) => (
            <Link
              key={chat.id}
              href={`/chat/${chat.id}`}
              className="block bg-white border border-gray-200 rounded-xl p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                {/* Avatar */}
                <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">
                    {getModelName(chat.modelId).charAt(0)}
                  </span>
                </div>

                {/* Chat Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-gray-900 truncate">
                      {getModelName(chat.modelId)}
                    </h3>
                    <span className="text-xs text-gray-500">
                      {formatLastMessageTime(chat.lastMessageAt)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">
                    {chat.lastMessage}
                  </p>
                </div>

                {/* Unread Badge */}
                {chat.unreadCount > 0 && (
                  <div className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {chat.unreadCount}
                  </div>
                )}
              </div>
            </Link>
          ))
        )}
      </div>

      {/* Quick Actions */}
      <div className="space-y-3">
        <Link
          href="/discover"
          className="block bg-black text-white text-center py-3 rounded-xl font-medium"
        >
          Start New Chat
        </Link>
        
        <div className="grid grid-cols-2 gap-3">
          <button className="bg-gray-100 text-gray-700 py-3 rounded-xl font-medium flex items-center justify-center">
            <Phone className="w-4 h-4 mr-2" />
            Voice Calls
          </button>
          <button className="bg-gray-100 text-gray-700 py-3 rounded-xl font-medium flex items-center justify-center">
            <Clock className="w-4 h-4 mr-2" />
            Call History
          </button>
        </div>
      </div>
    </div>
  )
}
