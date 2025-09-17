'use client'

import { useState } from 'react'
import { useAppStore } from '@/demo/store'
import { 
  User, 
  Phone, 
  Globe, 
  Wallet, 
  Settings, 
  Eye, 
  EyeOff, 
  Share2, 
  Gift,
  Users,
  HelpCircle,
  Shield,
  LogOut
} from 'lucide-react'
import { demoAPI } from '@/demo/api'

export default function ProfilePage() {
  const { user, wallet, referrals, communityPublishing, readReceipts, toggleCommunityPublishing, toggleReadReceipts } = useAppStore()
  const [showReferralModal, setShowReferralModal] = useState(false)

  const handleShareReferral = async () => {
    if (!user) return
    
    try {
      const shareLink = await demoAPI.generateWhatsAppShareLink(user.referralCode)
      window.open(shareLink, '_blank')
    } catch (error) {
      console.error('Failed to generate share link:', error)
    }
  }

  const handleLogout = () => {
    // Clear user data and redirect
    localStorage.removeItem('sangini-store')
    window.location.href = '/'
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Please log in to view profile</p>
      </div>
    )
  }

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Profile</h1>
        <p className="text-gray-600">
          Manage your account and preferences
        </p>
      </div>

      {/* User Info */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
            <span className="text-2xl font-bold text-white">
              {user.name?.charAt(0) || user.phone.charAt(0)}
            </span>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-900">
              {user.name || `+91 ${user.phone}`}
            </h2>
            <p className="text-gray-600">+91 {user.phone}</p>
            <p className="text-sm text-gray-500">
              Language: {user.language?.toUpperCase()}
              {user.state && ` • ${user.state}`}
            </p>
          </div>
        </div>
      </div>

      {/* Wallet */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Wallet className="w-6 h-6 text-green-600" />
            <div>
              <h3 className="font-semibold text-gray-900">Wallet Balance</h3>
              <p className="text-2xl font-bold text-green-600">₹{wallet}</p>
            </div>
          </div>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
            Add Money
          </button>
        </div>
      </div>

      {/* Referral Stats */}
      <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Gift className="w-5 h-5 text-purple-600" />
            <h3 className="font-semibold text-gray-900">Referral Program</h3>
          </div>
          <button
            onClick={handleShareReferral}
            className="bg-purple-600 text-white px-3 py-1 rounded-lg text-sm font-medium flex items-center space-x-1"
          >
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-purple-600">{referrals.length}</p>
            <p className="text-sm text-gray-600">Friends Invited</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-purple-600">₹{referrals.length * 10}</p>
            <p className="text-sm text-gray-600">Earned</p>
          </div>
        </div>

        <div className="mt-3 bg-white rounded-lg p-3">
          <p className="text-sm text-gray-700 mb-2">
            <strong>Your Referral Code:</strong> {user.referralCode}
          </p>
          <p className="text-xs text-gray-600">
            Invite friends and earn ₹10 for each successful referral!
          </p>
        </div>
      </div>

      {/* Settings */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Settings</h3>
        
        {/* Privacy Settings */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-4">
          <h4 className="font-semibold text-gray-900">Privacy</h4>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {communityPublishing ? <Eye className="w-5 h-5 text-gray-600" /> : <EyeOff className="w-5 h-5 text-gray-600" />}
              <div>
                <p className="font-medium text-gray-900">Community Publishing</p>
                <p className="text-sm text-gray-600">Share your photos with the community</p>
              </div>
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

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Eye className="w-5 h-5 text-gray-600" />
              <div>
                <p className="font-medium text-gray-900">Read Receipts</p>
                <p className="text-sm text-gray-600">Let others know when you've read their messages</p>
              </div>
            </div>
            <button
              onClick={toggleReadReceipts}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                readReceipts ? 'bg-black' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  readReceipts ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Account Actions */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-3">
          <h4 className="font-semibold text-gray-900">Account</h4>
          
          <button className="w-full flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <Globe className="w-5 h-5 text-gray-600" />
            <span className="text-gray-900">Change Language</span>
          </button>
          
          <button className="w-full flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <Settings className="w-5 h-5 text-gray-600" />
            <span className="text-gray-900">App Settings</span>
          </button>
          
          <button className="w-full flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <HelpCircle className="w-5 h-5 text-gray-600" />
            <span className="text-gray-900">Help & Support</span>
          </button>
          
          <button className="w-full flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <Shield className="w-5 h-5 text-gray-600" />
            <span className="text-gray-900">Privacy Policy</span>
          </button>
          
          <button 
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 p-3 hover:bg-red-50 rounded-lg transition-colors text-red-600"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-4">
        <p className="text-xs text-gray-500">
          Sangini AI v1.0 • 18+ Only • Made with ❤️ in India
        </p>
      </div>
    </div>
  )
}
