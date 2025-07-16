'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import ComposeModal from './ComposeModal'

export default function ComposeButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Mobile Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 w-14 h-14 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 transition-colors flex items-center justify-center"
        aria-label="Compose new post"
      >
        <Plus className="w-6 h-6" />
      </button>

      {/* Compose Modal */}
      <ComposeModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
} 