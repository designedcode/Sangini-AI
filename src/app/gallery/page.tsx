'use client'

import { useState } from 'react'
import { useAppStore } from '@/demo/store'
import { Eye, EyeOff, Share2, Download, Settings } from 'lucide-react'
import MediaTile from '@/components/MediaTile'

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState<'my-media' | 'community'>('my-media')
  const { user, communityPublishing, toggleCommunityPublishing } = useAppStore()

  // Mock media data
  const myMedia = [
    { id: '1', type: 'image' as const, url: '', isLocked: false },
    { id: '2', type: 'image' as const, url: '', isLocked: false },
    { id: '3', type: 'video' as const, url: '', isLocked: true },
    { id: '4', type: 'image' as const, url: '', isLocked: false },
  ]

  const communityMedia = [
    { id: 'c1', type: 'image' as const, url: '', isLocked: false, author: 'Priya' },
    { id: 'c2', type: 'image' as const, url: '', isLocked: false, author: 'Kavya' },
    { id: 'c3', type: 'video' as const, url: '', isLocked: false, author: 'Meera' },
    { id: 'c4', type: 'image' as const, url: '', isLocked: false, author: 'Anjali' },
  ]

  const handleShare = (mediaId: string) => {
    console.log('Share media:', mediaId)
  }

  const handleDownload = (mediaId: string) => {
    console.log('Download media:', mediaId)
  }

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Gallery</h1>
        <p className="text-gray-600">
          Your photos and community content
        </p>
      </div>

      {/* Publishing Toggle */}
      <div className="bg-gray-50 rounded-xl p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-900">Community Publishing</h3>
            <p className="text-sm text-gray-600">
              Share your photos with the community
            </p>
          </div>
          <button
            onClick={toggleCommunityPublishing}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              communityPublishing ? 'bg-black' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                communityPublishing ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          {communityPublishing ? 'Your photos are shared with the community' : 'Your photos are private'}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setActiveTab('my-media')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'my-media'
              ? 'bg-white text-black shadow-sm'
              : 'text-gray-600'
          }`}
        >
          Your Images
        </button>
        <button
          onClick={() => setActiveTab('community')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'community'
              ? 'bg-white text-black shadow-sm'
              : 'text-gray-600'
          }`}
        >
          Community
        </button>
      </div>

      {/* Content */}
      {activeTab === 'my-media' ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Your Images</h2>
            <div className="flex space-x-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Settings className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>

          {myMedia.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">📸</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No images yet</h3>
              <p className="text-gray-600">
                Start chatting to receive photos from your AI companions
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {myMedia.map((media) => (
                <div key={media.id} className="relative group">
                  <MediaTile
                    type={media.type}
                    url={media.url}
                    isLocked={media.isLocked}
                    className="w-full"
                  />
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex space-x-1">
                      <button
                        onClick={() => handleShare(media.id)}
                        className="p-1 bg-black bg-opacity-50 text-white rounded"
                      >
                        <Share2 className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => handleDownload(media.id)}
                        className="p-1 bg-black bg-opacity-50 text-white rounded"
                      >
                        <Download className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Community</h2>
            <div className="flex items-center space-x-2">
              <Eye className="w-4 h-4 text-gray-600" />
              <span className="text-sm text-gray-600">
                {communityMedia.length} photos
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {communityMedia.map((media) => (
              <div key={media.id} className="relative group">
                <MediaTile
                  type={media.type}
                  url={media.url}
                  isLocked={media.isLocked}
                  className="w-full"
                />
                <div className="absolute bottom-2 left-2">
                  <span className="text-xs bg-black bg-opacity-50 text-white px-2 py-1 rounded">
                    {media.author}
                  </span>
                </div>
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex space-x-1">
                    <button
                      onClick={() => handleShare(media.id)}
                      className="p-1 bg-black bg-opacity-50 text-white rounded"
                    >
                      <Share2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State for Community */}
      {activeTab === 'community' && communityMedia.length === 0 && (
        <div className="text-center py-8">
          <div className="text-4xl mb-4">👥</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No community photos</h3>
          <p className="text-gray-600">
            Enable community publishing to see photos from other users
          </p>
        </div>
      )}
    </div>
  )
}
