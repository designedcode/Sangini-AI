'use client'

import { useState, useEffect } from 'react'
import { X, Search } from 'lucide-react'
import { useAppStore } from '@/demo/store'
import { demoAPI } from '@/demo/api'
import { languages } from '@/demo/seeds/languages'
import { stateLangOrder } from '@/demo/seeds/languages'
import { t } from '@/demo/i18n'
import { Language } from '@/types'

interface LanguageGateModalProps {
  isOpen: boolean
  onClose: () => void
  onLanguageSelect: (language: string) => void
}

export default function LanguageGateModal({ isOpen, onClose, onLanguageSelect }: LanguageGateModalProps) {
  const [sortedLanguages, setSortedLanguages] = useState(languages)
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (isOpen) {
      loadSortedLanguages()
    }
  }, [isOpen])

  const loadSortedLanguages = async () => {
    setIsLoading(true)
    try {
      const detectedState = await demoAPI.detectState()
      const devicePrefs = [...(navigator.languages || ['en-US'])]
      const allLanguageCodes = languages.map(l => l.code)
      
      const sortedCodes = await demoAPI.sortLanguagesForUser(
        detectedState,
        devicePrefs,
        allLanguageCodes,
        stateLangOrder
      )
      
      const sorted = sortedCodes.map(code => 
        languages.find(l => l.code === code)
      ).filter((lang): lang is Language => lang !== undefined)
      
      setSortedLanguages(sorted)
    } catch (error) {
      console.error('Error sorting languages:', error)
      setSortedLanguages(languages)
    } finally {
      setIsLoading(false)
    }
  }

  const filteredLanguages = sortedLanguages.filter(lang =>
    lang.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lang.nativeName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            {t('choose_language', 'en')}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search languages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
            />
          </div>
        </div>

        {/* Language List */}
        <div className="max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading languages...</p>
            </div>
          ) : (
            <div className="p-2">
              {filteredLanguages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => onLanguageSelect(language.code)}
                  className="w-full p-4 text-left hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{language.nativeName}</p>
                      <p className="text-sm text-gray-600">{language.name}</p>
                    </div>
                    {language.code === 'en' && (
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        Default
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <p className="text-xs text-gray-600 text-center">
            Language preference will be saved for future visits
          </p>
        </div>
      </div>
    </div>
  )
}
