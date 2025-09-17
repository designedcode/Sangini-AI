'use client'

import { useState } from 'react'
import { useAppStore } from '@/demo/store'
import { demoAPI } from '@/demo/api'
import { models } from '@/demo/seeds/models'
import { categories } from '@/demo/seeds/categories'
import { t } from '@/demo/i18n'
import { Star, Play } from 'lucide-react'

export default function DiscoverPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const { user, addChat, setActiveChat } = useAppStore()

  const filteredModels = selectedCategory
    ? models.filter(model => model.category === selectedCategory)
    : models

  const handleStartChat = async (modelId: string) => {
    if (!user) {
      // Show auth modal
      return
    }

    try {
      const chat = await demoAPI.startChat(modelId)
      setActiveChat(chat.id)
      // Navigate to chat
      window.location.href = `/chat/${chat.id}`
    } catch (error) {
      console.error('Failed to start chat:', error)
    }
  }

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Find your ideal AI partner
        </h1>
        <p className="text-gray-600">
          Start chatting in seconds
        </p>
      </div>

      {/* Categories */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-gray-900">Categories</h2>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              !selectedCategory
                ? 'bg-black text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category.id
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.icon} {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Model Cards */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">
          {selectedCategory ? 'Available Models' : 'Popular Models'}
        </h2>
        
        <div className="grid gap-4">
          {filteredModels.map((model) => (
            <div
              key={model.id}
              className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm"
            >
              {/* Model Card */}
              <div className="p-4">
                <div className="flex items-start space-x-4">
                  {/* Avatar */}
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-bold text-white">
                      {model.name.charAt(0)}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {model.name}
                      </h3>
                      {model.popular && (
                        <div className="flex items-center text-yellow-600">
                          <Star className="w-4 h-4 fill-current" />
                          <span className="text-xs ml-1">Popular</span>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {model.tagline}
                    </p>
                    <p className="text-xs text-gray-500">
                      {model.description}
                    </p>
                  </div>
                </div>

                {/* Start Chat Button */}
                <button
                  onClick={() => handleStartChat(model.id)}
                  className="w-full mt-4 bg-black text-white py-3 rounded-xl font-medium flex items-center justify-center hover:bg-gray-800 transition-colors"
                >
                  <Play className="w-5 h-5 mr-2" />
                  {t('start_chat', user?.language || 'en')}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {filteredModels.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No models found in this category.</p>
        </div>
      )}
    </div>
  )
}
