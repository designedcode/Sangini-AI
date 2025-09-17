'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MessageCircle, Compass, Image, User, Phone } from 'lucide-react'
import { useAppStore } from '@/demo/store'

export default function BottomBar() {
  const pathname = usePathname()
  const { user, chats } = useAppStore()

  const tabs = [
    {
      name: 'Chats',
      href: '/chats',
      icon: MessageCircle,
      badge: chats.filter(chat => chat.unreadCount > 0).length
    },
    {
      name: 'Discover',
      href: '/discover',
      icon: Compass,
      badge: 0
    },
    {
      name: 'Gallery',
      href: '/gallery',
      icon: Image,
      badge: 0
    },
    {
      name: 'Profile',
      href: '/profile',
      icon: User,
      badge: 0
    }
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-40">
      <div className="flex justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = pathname === tab.href
          
          return (
            <Link
              key={tab.name}
              href={tab.href}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                isActive ? 'text-black' : 'text-gray-500'
              }`}
            >
              <div className="relative">
                <Icon className={`w-6 h-6 ${isActive ? 'text-black' : 'text-gray-500'}`} />
                {tab.badge > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className={`text-xs mt-1 ${isActive ? 'font-medium' : ''}`}>
                {tab.name}
              </span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
