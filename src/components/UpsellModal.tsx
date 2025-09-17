'use client'

import { useState } from 'react'
import { X, Gift, Users } from 'lucide-react'
import { useAppStore } from '@/demo/store'
import { demoAPI } from '@/demo/api'
import { skus } from '@/demo/seeds/skus'
import { t } from '@/demo/i18n'

interface UpsellModalProps {
  isOpen: boolean
  onClose: () => void
  onPurchase: (skuId: string) => void
  type?: 'locked-media' | 'daily-limit' | 'call-topup'
}

export default function UpsellModal({ isOpen, onClose, onPurchase, type = 'locked-media' }: UpsellModalProps) {
  const [selectedSku, setSelectedSku] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  
  const { user, updateWallet } = useAppStore()

  const getRelevantSKUs = () => {
    switch (type) {
      case 'locked-media':
        return skus.filter(sku => sku.type === 'tonight' || sku.type === 'quick')
      case 'daily-limit':
        return skus.filter(sku => sku.type === 'tonight' || sku.type === 'day')
      case 'call-topup':
        return skus.filter(sku => sku.type === 'topup' && sku.minutes)
      default:
        return skus.filter(sku => sku.type === 'tonight' || sku.type === 'quick')
    }
  }

  const handlePurchase = async (skuId: string) => {
    setIsLoading(true)
    try {
      const result = await demoAPI.purchaseSKU(skuId)
      if (result.success) {
        const sku = skus.find(s => s.id === skuId)
        if (sku) {
          // Add wallet credit for demo
          updateWallet(sku.price)
        }
        onPurchase(skuId)
        onClose()
      }
    } catch (error) {
      console.error('Purchase failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleReferral = async () => {
    if (!user) return
    
    try {
      const shareLink = await demoAPI.generateWhatsAppShareLink(user.referralCode)
      window.open(shareLink, '_blank')
    } catch (error) {
      console.error('Failed to generate share link:', error)
    }
  }

  if (!isOpen) return null

  const relevantSKUs = getRelevantSKUs()

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            {type === 'locked-media' && 'Unlock Content'}
            {type === 'daily-limit' && 'Continue Chatting'}
            {type === 'call-topup' && 'Add Call Minutes'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Referral Option */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-200">
            <div className="flex items-center mb-2">
              <Gift className="w-5 h-5 text-purple-600 mr-2" />
              <h3 className="font-semibold text-purple-900">Free Option</h3>
            </div>
            <p className="text-sm text-purple-800 mb-3">
              Invite a friend and get +3 min call instantly!
            </p>
            <button
              onClick={handleReferral}
              className="w-full bg-purple-600 text-white py-2 rounded-lg font-medium flex items-center justify-center"
            >
              <Users className="w-4 h-4 mr-2" />
              Invite Friend
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center">
            <div className="flex-1 border-t border-gray-200"></div>
            <span className="px-3 text-sm text-gray-500">OR</span>
            <div className="flex-1 border-t border-gray-200"></div>
          </div>

          {/* Purchase Options */}
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900">Purchase Options</h3>
            {relevantSKUs.map((sku) => (
              <div
                key={sku.id}
                className={`p-4 border rounded-xl cursor-pointer transition-all ${
                  selectedSku === sku.id
                    ? 'border-black bg-gray-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedSku(sku.id)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">{sku.name}</h4>
                  <span className="text-lg font-bold text-black">₹{sku.price}</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{sku.description}</p>
                <div className="flex flex-wrap gap-1">
                  {sku.features.map((feature, index) => (
                    <span
                      key={index}
                      className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Purchase Button */}
          {selectedSku && (
            <button
              onClick={() => handlePurchase(selectedSku)}
              disabled={isLoading}
              className="w-full bg-black text-white py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mx-auto"></div>
              ) : (
                `Purchase ₹${skus.find(s => s.id === selectedSku)?.price}`
              )}
            </button>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <p className="text-xs text-gray-600 text-center">
            All purchases are secure and instant. No hidden fees.
          </p>
        </div>
      </div>
    </div>
  )
}
