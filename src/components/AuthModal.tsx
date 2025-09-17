'use client'

import { useState } from 'react'
import { X, Phone, ArrowRight } from 'lucide-react'
import { useAppStore } from '@/demo/store'
import { demoAPI } from '@/demo/api'
import { t } from '@/demo/i18n'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export default function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [step, setStep] = useState<'phone' | 'otp'>('phone')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  
  const { user, setUser, setAuthenticated } = useAppStore()

  const handleSendOTP = async () => {
    if (!phone.trim()) {
      setError('Please enter your phone number')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const result = await demoAPI.sendOTP(phone)
      if (result.success) {
        setStep('otp')
      } else {
        setError(result.message)
      }
    } catch (error) {
      setError('Failed to send OTP. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyOTP = async () => {
    if (!otp.trim()) {
      setError('Please enter OTP')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const result = await demoAPI.verifyOTP(phone, otp)
      if (result.success && result.user) {
        setUser(result.user)
        setAuthenticated(true)
        onSuccess()
        onClose()
      } else {
        setError('Invalid OTP. Please try again.')
      }
    } catch (error) {
      setError('Verification failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (step === 'phone') {
        handleSendOTP()
      } else {
        handleVerifyOTP()
      }
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-sm overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            {step === 'phone' ? 'Enter Phone' : 'Verify OTP'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 'phone' ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center">
                    <span className="text-gray-500 text-sm">+91</span>
                  </div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter your phone number"
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-lg"
                    maxLength={10}
                  />
                </div>
              </div>

              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Demo Mode:</strong> Use OTP <code className="bg-blue-100 px-1 rounded">0000</code> for testing
                </p>
              </div>

              {error && (
                <div className="bg-red-50 p-3 rounded-lg">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}

              <button
                onClick={handleSendOTP}
                disabled={isLoading || !phone.trim()}
                className="w-full bg-black text-white py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    <Phone className="w-5 h-5 mr-2" />
                    Send OTP
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter OTP sent to +91 {phone}
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter 4-digit OTP"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-lg text-center tracking-widest"
                  maxLength={4}
                />
              </div>

              <div className="bg-green-50 p-3 rounded-lg">
                <p className="text-sm text-green-800">
                  <strong>Demo:</strong> Enter <code className="bg-green-100 px-1 rounded">0000</code> to continue
                </p>
              </div>

              {error && (
                <div className="bg-red-50 p-3 rounded-lg">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}

              <button
                onClick={handleVerifyOTP}
                disabled={isLoading || !otp.trim()}
                className="w-full bg-black text-white py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    Verify OTP
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </button>

              <button
                onClick={() => setStep('phone')}
                className="w-full text-gray-600 py-2 text-sm hover:text-gray-800"
              >
                Change phone number
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <p className="text-xs text-gray-600 text-center">
            By continuing, I confirm I'm 18+ and agree to{' '}
            <a href="#" className="text-black underline">Terms of Service</a> and{' '}
            <a href="#" className="text-black underline">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  )
}
