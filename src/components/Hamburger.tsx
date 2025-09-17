'use client'

import { useState } from 'react'
import { Menu, X, Bell, Settings, HelpCircle, ExternalLink } from 'lucide-react'
import { useAppStore } from '@/demo/store'

export default function Hamburger() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, wallet } = useAppStore()

  const menuItems = [
    {
      name: 'Telegram',
      href: 'https://t.me/sanginiai',
      icon: ExternalLink,
      external: true
    },
    {
      name: 'Discord',
      href: 'https://discord.gg/sanginiai',
      icon: ExternalLink,
      external: true
    },
    {
      name: 'Twitter/X',
      href: 'https://twitter.com/sanginiai',
      icon: ExternalLink,
      external: true
    },
    {
      name: 'Settings',
      href: '/profile',
      icon: Settings,
      external: false
    },
    {
      name: 'Help & Support',
      href: '/help',
      icon: HelpCircle,
      external: false
    }
  ]

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <Menu className="w-6 h-6 text-gray-700" />
      </button>

      {/* Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="fixed left-0 top-0 bottom-0 w-80 bg-white shadow-xl">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* User Info */}
            {user && (
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">
                      {user.name?.charAt(0) || user.phone.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {user.name || `+91 ${user.phone}`}
                    </p>
                    <p className="text-sm text-gray-600">
                      Wallet: ₹{wallet}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Menu Items */}
            <div className="p-4 space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon
                
                if (item.external) {
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 p-3 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Icon className="w-5 h-5 text-gray-600" />
                      <span className="text-gray-900">{item.name}</span>
                    </a>
                  )
                } else {
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      className="flex items-center space-x-3 p-3 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Icon className="w-5 h-5 text-gray-600" />
                      <span className="text-gray-900">{item.name}</span>
                    </a>
                  )
                }
              })}
            </div>

            {/* Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-gray-50">
              <p className="text-xs text-gray-600 text-center">
                Sangini AI v1.0 • 18+ Only
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
