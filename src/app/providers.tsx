'use client'

import { useEffect } from 'react'
import { useAppStore } from '@/demo/store'
import LanguageGateModal from '@/components/LanguageGateModal'
import AuthModal from '@/components/AuthModal'
import UpsellModal from '@/components/UpsellModal'
import CallOverlay from '@/components/CallOverlay'
import BottomBar from '@/components/BottomBar'
import Hamburger from '@/components/Hamburger'
import { Bell } from 'lucide-react'

export default function AppProvider({ children }: { children: React.ReactNode }) {
  const {
    showLanguageModal,
    showAuthModal,
    showUpsellModal,
    showCallOverlay,
    setShowLanguageModal,
    setShowAuthModal,
    setShowUpsellModal,
    setShowCallOverlay,
    isAuthenticated,
    user
  } = useAppStore()

  // Check if user needs language selection on first visit
  useEffect(() => {
    const hasSelectedLanguage = localStorage.getItem('sangini-language-selected')
    if (!hasSelectedLanguage) {
      setShowLanguageModal(true)
    }
  }, [setShowLanguageModal])

  const handleLanguageSelect = (language: string) => {
    localStorage.setItem('sangini-language-selected', language)
    setShowLanguageModal(false)
    
    // Show auth modal after language selection
    if (!isAuthenticated) {
      setShowAuthModal(true)
    }
  }

  const handleAuthSuccess = () => {
    setShowAuthModal(false)
    // User is now authenticated
  }

  const handlePurchase = (skuId: string) => {
    console.log('Purchase completed:', skuId)
    setShowUpsellModal(false)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Main Header */}
      <header className="sticky top-0 z-30 bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <Hamburger />
          <div className="flex items-center space-x-2">
            <h1 className="text-lg font-bold text-black">Sangini AI</h1>
            <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">
              18+
            </span>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="pb-20">
        {children}
      </main>

      {/* Bottom Navigation */}
      <BottomBar />

      {/* Modals */}
      <LanguageGateModal
        isOpen={showLanguageModal}
        onClose={() => setShowLanguageModal(false)}
        onLanguageSelect={handleLanguageSelect}
      />

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
      />

      <UpsellModal
        isOpen={showUpsellModal}
        onClose={() => setShowUpsellModal(false)}
        onPurchase={handlePurchase}
      />

      <CallOverlay
        isOpen={showCallOverlay}
        onClose={() => setShowCallOverlay(false)}
        modelName="Priya"
      />
    </div>
  )
}
