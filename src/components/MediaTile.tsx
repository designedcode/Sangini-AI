'use client'

import { useState } from 'react'
import { Lock, Eye, EyeOff, Share2 } from 'lucide-react'
import { useAppStore } from '@/demo/store'
import UpsellModal from './UpsellModal'
import { t } from '@/demo/i18n'

interface MediaTileProps {
  type: 'image' | 'video'
  url?: string
  isLocked?: boolean
  className?: string
}

export default function MediaTile({ type, url, isLocked = true, className = '' }: MediaTileProps) {
  const [showUpsell, setShowUpsell] = useState(false)
  const { user, isAuthenticated } = useAppStore()

  const handleTap = () => {
    if (!isAuthenticated || !user) {
      // Show auth modal
      return
    }
    
    if (isLocked) {
      setShowUpsell(true)
    } else {
      // Open full-screen viewer
      console.log('Open media viewer')
    }
  }

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation()
    // Share functionality
    console.log('Share media')
  }

  return (
    <>
      <div
        className={`relative rounded-xl overflow-hidden cursor-pointer group ${className}`}
        onClick={handleTap}
      >
        {/* Placeholder Content */}
        <div className="w-full h-32 bg-gradient-to-br from-pink-200 to-purple-200 flex items-center justify-center">
          {type === 'image' ? (
            <div className="text-4xl">📸</div>
          ) : (
            <div className="text-4xl">🎥</div>
          )}
        </div>

        {/* Lock Overlay */}
        {isLocked && (
          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
            <div className="text-center text-white">
              <Lock className="w-8 h-8 mx-auto mb-2" />
              <p className="text-sm font-medium">Tap to unlock</p>
              <p className="text-xs opacity-80 mt-1">
                {t('unlock_with', user?.language || 'en')}
              </p>
            </div>
          </div>
        )}

        {/* Share Button */}
        <button
          onClick={handleShare}
          className="absolute top-2 right-2 p-2 bg-black bg-opacity-50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Share2 className="w-4 h-4" />
        </button>

        {/* Status Indicators */}
        <div className="absolute bottom-2 left-2 flex space-x-1">
          {isLocked && (
            <div className="bg-red-500 text-white text-xs px-2 py-1 rounded">
              🔒 Locked
            </div>
          )}
          {type === 'video' && (
            <div className="bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
              🎥 Video
            </div>
          )}
        </div>
      </div>

      {/* Upsell Modal */}
      <UpsellModal
        isOpen={showUpsell}
        onClose={() => setShowUpsell(false)}
        onPurchase={(skuId) => {
          console.log('Purchased:', skuId)
          setShowUpsell(false)
        }}
        type="locked-media"
      />
    </>
  )
}
