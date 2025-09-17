'use client'

import { useState } from 'react'
import { Phone, PhoneOff, Mic, MicOff, Volume2, VolumeX } from 'lucide-react'
import { useAppStore } from '@/demo/store'

interface CallOverlayProps {
  isOpen: boolean
  onClose: () => void
  modelName: string
}

export default function CallOverlay({ isOpen, onClose, modelName }: CallOverlayProps) {
  const [isCallActive, setIsCallActive] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isSpeakerOn, setIsSpeakerOn] = useState(true)
  const [callDuration, setCallDuration] = useState(0)
  const [callMinutesLeft, setCallMinutesLeft] = useState(5) // Demo: 5 minutes left
  
  const { setShowUpsellModal } = useAppStore()

  const handleStartCall = () => {
    setIsCallActive(true)
    // Start timer
    const timer = setInterval(() => {
      setCallDuration(prev => prev + 1)
    }, 1000)
    
    // Auto-end call after 3 minutes for demo
    setTimeout(() => {
      handleEndCall()
    }, 180000)
  }

  const handleEndCall = () => {
    setIsCallActive(false)
    onClose()
  }

  const handleTopUp = () => {
    setShowUpsellModal(true)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-sm mx-4 overflow-hidden">
        {/* Header */}
        <div className="p-6 text-center border-b border-gray-200">
          <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-2xl font-bold text-white">
              {modelName.charAt(0)}
            </span>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-1">{modelName}</h2>
          <p className="text-sm text-gray-600">
            {isCallActive ? 'Call in progress...' : 'Ready to call'}
          </p>
        </div>

        {/* Call Status */}
        <div className="p-6 text-center">
          {isCallActive ? (
            <div className="space-y-4">
              <div className="text-3xl font-mono text-gray-900">
                {formatTime(callDuration)}
              </div>
              <div className="text-sm text-gray-600">
                Minutes left: {callMinutesLeft}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-sm text-gray-600">
                Call minutes available: {callMinutesLeft}
              </div>
              {callMinutesLeft === 0 && (
                <div className="bg-red-50 p-3 rounded-lg">
                  <p className="text-sm text-red-800">
                    No call minutes left. Top up to continue.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="p-6 space-y-4">
          {/* Audio Controls */}
          {isCallActive && (
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className={`p-3 rounded-full ${
                  isMuted ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
                }`}
              >
                {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
              </button>
              <button
                onClick={() => setIsSpeakerOn(!isSpeakerOn)}
                className={`p-3 rounded-full ${
                  isSpeakerOn ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                }`}
              >
                {isSpeakerOn ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
              </button>
            </div>
          )}

          {/* Main Action Buttons */}
          <div className="flex justify-center space-x-4">
            {!isCallActive ? (
              <>
                <button
                  onClick={handleStartCall}
                  disabled={callMinutesLeft === 0}
                  className="bg-green-500 text-white p-4 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Phone className="w-6 h-6" />
                </button>
                {callMinutesLeft === 0 && (
                  <button
                    onClick={handleTopUp}
                    className="bg-black text-white px-6 py-3 rounded-lg font-medium"
                  >
                    Top Up
                  </button>
                )}
              </>
            ) : (
              <button
                onClick={handleEndCall}
                className="bg-red-500 text-white p-4 rounded-full"
              >
                <PhoneOff className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* Top Up Option */}
          {!isCallActive && callMinutesLeft > 0 && (
            <button
              onClick={handleTopUp}
              className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg text-sm font-medium"
            >
              Add More Minutes
            </button>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50 text-center">
          <p className="text-xs text-gray-600">
            Call quality may vary based on your internet connection
          </p>
        </div>
      </div>
    </div>
  )
}
